import pandas as pd
import torch
import torch.nn as nn
import time
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split

# Code Purpose: make a supervised regression model, aimed at predicting a composite score for Olympic teams. 
# Uses multiple team attributes and medal counts into a neural network to estimate performance scores.
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

athletes_df = pd.read_excel('Athletes.xlsx')
coaches_df = pd.read_excel('Coaches.xlsx')
entries_gender_df = pd.read_excel('EntriesGender.xlsx')
medals_df = pd.read_excel('Medals.xlsx')
teams_df = pd.read_excel('Teams.xlsx')

merged_df = athletes_df.merge(medals_df, on='NOC', how='left')
merged_df = merged_df.merge(entries_gender_df, on='Discipline', how='left')
merged_df = merged_df.merge(teams_df, on='NOC', how='left')
merged_df = merged_df.merge(coaches_df, on='NOC', how='left')

features = [
    'total_athletes', 
    'total_medals', 
    'gold_per_athlete', 
    'medals_per_athlete', 
    'male_to_female_ratio',
]

# Calculate new columns
merged_df['total_athletes'] = merged_df['Male'] + merged_df['Female']
merged_df['total_medals'] = merged_df['Gold'] + merged_df['Silver'] + merged_df['Bronze']
merged_df['gold_per_athlete'] = merged_df['Gold'] / merged_df['total_athletes']
merged_df['medals_per_athlete'] = merged_df['total_medals'] / merged_df['total_athletes']
merged_df['male_to_female_ratio'] = merged_df['Male'] / merged_df['Female']



#no need for data cleanup, as the provided data is already complete/clean!
merged_df.fillna(0, inplace=True)

#calculate scores to train the model off of
merged_df['medal_score'] = 3 * merged_df['Gold'] + 2 * merged_df['Silver'] + 1 * merged_df['Bronze']

merged_df['composite_score'] = (3 * merged_df['medal_score'] +
                                0.5 * merged_df['medals_per_athlete'] +
                                0.2 * merged_df['total_athletes'] +
                                0.3 * merged_df['male_to_female_ratio'])

target = 'composite_score' #might change to medal score
merged_df.dropna(subset=[target], inplace=True)

X = merged_df[features].values
y = merged_df[target].values

# training sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# small dataset so small test size


class OlympicDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32)  # Keep data on CPU here
        self.y = torch.tensor(y, dtype=torch.float32)  # Keep data on CPU here
        
    def __len__(self):
        return len(self.y)
    
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Define the neural network model
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.fc1 = nn.Linear(len(features), 64)
        self.fc2 = nn.Linear(64, 32)
        self.fc3 = nn.Linear(32, 1)
    
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        x = torch.relu(self.fc2(x))
        x = self.fc3(x)
        return x

# Split the dataset
X = merged_df[features].values
y = merged_df['composite_score'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create Dataset instances for both training and testing
train_dataset = OlympicDataset(X_train, y_train)
test_dataset = OlympicDataset(X_test, y_test)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

model = SimpleNN().to(device)

criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

for epoch in range(2):
    model.train()
    epoch_start_time = time.time()
    for X_batch, y_batch in train_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)  # Ensure data is on the GPU
        optimizer.zero_grad()
        outputs = model(X_batch)
        loss = criterion(outputs, y_batch.unsqueeze(1))
        loss.backward()
        optimizer.step()
    epoch_duration = time.time() - epoch_start_time
    print(f'Epoch {epoch+1}, Loss: {loss.item()}, Duration: {epoch_duration:.2f} seconds')


# Evaluation
model.eval()
y_pred = []
with torch.no_grad():
    for X_batch, _ in test_loader:
        outputs = model(X_batch)
        y_pred.extend(outputs.squeeze().tolist())

accuracy = sum((torch.tensor(y_pred) - torch.tensor(y_test))**2).sqrt().item()
print(f'Accuracy (RMSE): {accuracy}')

torch.save(model.state_dict(), 'api/olympic_gold_medal_predictor.pth')
print("Model saved to 'api/olympic_gold_medal_predictor.pth'")