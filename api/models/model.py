import torch

class OlympicPredictorNN(torch.nn.Module):
    def __init__(self, num_features):
        super().__init__()
        self.layers = torch.nn.Sequential(
            torch.nn.Linear(num_features, 32),
            torch.nn.ReLU(),
            torch.nn.Linear(32, 16),
            torch.nn.ReLU(),
            torch.nn.Linear(16, 4),
            torch.nn.ReLU(),
            torch.nn.Linear(4, 1)
        )

    def forward(self, x):
        logits = self.layers(x)
        return logits