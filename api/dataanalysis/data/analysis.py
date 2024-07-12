import pandas as pd
import torch
import torch.nn as nn
import time
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler


athletes_df = pd.read_excel('Athletes.xlsx')
coaches_df = pd.read_excel('Coaches.xlsx')
entries_gender_df = pd.read_excel('EntriesGender.xlsx')
medals_df = pd.read_excel('Medals.xlsx')
teams_df = pd.read_excel('Teams.xlsx')

# Merging medals and entries_gender with teams
merged_df = teams_df.merge(medals_df, on='NOC', how='left')
merged_df = merged_df.merge(entries_gender_df, on='Discipline', how='left')

# Calculate new columns
merged_df['total_athletes'] = merged_df['Male'] + merged_df['Female']
merged_df['total_medals'] = merged_df['Gold'] + merged_df['Silver'] + merged_df['Bronze']
merged_df['gold_per_athlete'] = merged_df['Gold'] / merged_df['total_athletes']
merged_df['medals_per_athlete'] = merged_df['total_medals'] / merged_df['total_athletes']
merged_df['male_to_female_ratio'] = merged_df['Male'] / merged_df['Female']

# Fill missing values (not needed cuz data is clean)
merged_df.fillna(0, inplace=True)

# Calculate target
merged_df['medal_score'] = 3 * merged_df['Gold'] + 2 * merged_df['Silver'] + 1 * merged_df['Bronze']
merged_df['composite_score'] = (3 * merged_df['medal_score'] +
                                0.5 * merged_df['medals_per_athlete'] +
                                0.2 * merged_df['total_athletes'] +
                                0.1 * merged_df['male_to_female_ratio'])

features = [
    'total_athletes',
    'total_medals',
    'gold_per_athlete',
    'medals_per_athlete',
    'male_to_female_ratio'
]

X = merged_df[features].values
y = merged_df['composite_score'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
# 80% of data being used when trained.

#IMPROVE ACCURACY
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Save the merged DataFrame as Excel
merged_df.to_excel('merged_data.xlsx', index=False)
print("Merged DataFrame saved as 'merged_data.xlsx'")

class OlympicDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.float32)
        
    def __len__(self):
        return len(self.y)
    
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Define the neural network
class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.layers = nn.Sequential(
            nn.Linear(len(features), 32),
            nn.ReLU(),
            nn.Linear(32, 16),
            nn.ReLU(),
            nn.Linear(16, 4),
            nn.ReLU(),
            nn.Linear(4, 1)
        )
    
    def forward(self, x):
        return self.layers(x)

# Setup training with GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = SimpleNN().to(device)
criterion = nn.MSELoss()
optimizer = optim.Adam(model.parameters(), lr=0.01)

# Training loop with epoch timings
for epoch in range(250):
    model.train()
    epoch_start_time = time.time()
    for X_batch, y_batch in DataLoader(OlympicDataset(X_train, y_train), batch_size=32, shuffle=True):
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)
        optimizer.zero_grad()
        outputs = model(X_batch)
        loss = criterion(outputs, y_batch.unsqueeze(1))
        loss.backward()
        optimizer.step()
    epoch_duration = time.time() - epoch_start_time
    print(f'Epoch {epoch+1}, Loss: {loss.item()}, Duration: {epoch_duration:.2f} seconds')

# Evaluate model
model.eval()
y_pred = []
with torch.no_grad():
    for X_batch, _ in DataLoader(OlympicDataset(X_test, y_test), batch_size=32, shuffle=False):
        X_batch = X_batch.to(device)
        outputs = model(X_batch)
        y_pred.extend(outputs.squeeze().tolist())

# Calculate RMSE
mse = torch.mean((torch.tensor(y_pred) - torch.tensor(y_test)) ** 2)
rmse = torch.sqrt(mse)
print(f'RMSE: {rmse.item()}')

# Save the trained model and merged DataFrame
torch.save(model.state_dict(), 'olympic_gold_medal_predictor.pth')
print("Model saved to 'olympic_gold_medal_predictor.pth'")


"""
min_composite_score = merged_df['composite_score'].min()
max_composite_score = merged_df['composite_score'].max()
range_composite_score = max_composite_score - min_composite_score

print(f'Min Composite Score: {min_composite_score}')
print(f'Max Composite Score: {max_composite_score}')
print(f'Range of Composite Score: {range_composite_score}')
"""