import time
import pandas as pd
import torch
from torch.utils.data import Dataset, DataLoader
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from models import model

# Reading the dataframes and merging them
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
merged_df['composite_score'] = (
    3 * merged_df['medal_score'] +
    0.5 * merged_df['medals_per_athlete'] +
    0.2 * merged_df['total_athletes'] +
    0.1 * merged_df['male_to_female_ratio']
)

# Save the merged df for next times
merged_df.to_excel("datasets/2021/merged/tokyo_olympics_merged_data.xlsx", index=False)

# Model features
features = [
    'total_athletes',
    'total_medals',
    'gold_per_athlete',
    'medals_per_athlete',
    'male_to_female_ratio'
]

X = merged_df[features].values
y = merged_df['composite_score'].values
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42) # Train test split (80:20)

# Normalization
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Initialize Train Dataset
class OlympicDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.tensor(X, dtype=torch.float32)
        self.y = torch.tensor(y, dtype=torch.float32)
        
    def __len__(self):
        return len(self.y)
    
    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

# Import our model
model = model.OlympicPredictorNN(num_features=len(features))

# Setup training with GPU
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = model.to(device)
criterion = torch.nn.MSELoss()
optimizer = torch.optim.Adam(model.parameters(), lr=0.01)

# Training loop
EPOCH_COUNT = 250 # Hyperparameter
for epoch in range(EPOCH_COUNT):
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
    if epoch % 20 == 0: # Verbose log every 20 epochs
        print(f'Epoch {epoch+1}, Loss: {loss.item()}, Duration: {epoch_duration:.2f} seconds')

# Save the model
torch.save(model.state_dict(), "models/weights/olympic_win_predictor_2021.pth")
