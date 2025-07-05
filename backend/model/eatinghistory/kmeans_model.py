import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt # for data visualization
import seaborn as sns # for statistical data visualization

from sklearn.cluster import KMeans # for KMeans clustering
from sklearn.preprocessing import StandardScaler # for feature scaling
from sklearn.metrics import silhouette_score # for evaluating clustering performance

class KMeansModel:
    def __init__(self, n_clusters=3, random_state=42):
        self.n_clusters = n_clusters
        self.random_state = random_state
        self.model = KMeans(n_clusters=self.n_clusters, random_state=self.random_state)
        self.scaler = StandardScaler()

    def fit(self, X):
        X_scaled = self.scaler.fit_transform(X)
        self.model.fit(X_scaled)

    def predict(self, X):
        X_scaled = self.scaler.transform(X)
        return self.model.predict(X_scaled)

    def score(self, X):
        X_scaled = self.scaler.transform(X)
        return silhouette_score(X_scaled, self.model.labels_)
    def get_cluster_centers(self):
        return self.scaler.inverse_transform(self.model.cluster_centers_)
    def get_labels(self):
        return self.model.labels_
    def get_inertia(self):
        return self.model.inertia_
    def get_silhouette_score(self, X):
        X_scaled = self.scaler.transform(X)
        return silhouette_score(X_scaled, self.model.labels_)
    def plot_clusters(self, X, y=None):
        X_scaled = self.scaler.transform(X)
        plt.figure(figsize=(10, 6))
        sns.scatterplot(x=X_scaled[:, 0], y=X_scaled[:, 1], hue=self.model.labels_, palette='viridis', s=100)
        plt.title('KMeans Clustering')
        plt.xlabel('Feature 1 (scaled)')
        plt.ylabel('Feature 2 (scaled)')
        if y is not None:
            plt.legend(title='True Labels', loc='upper right')
        plt.show()
    def plot_elbow_curve(self, X, max_k=10):
        inertia = []
        for k in range(1, max_k + 1):
            model = KMeans(n_clusters=k, random_state=self.random_state)
            model.fit(X)
            inertia.append(model.inertia_)
        plt.figure(figsize=(10, 6))
        plt.plot(range(1, max_k + 1), inertia, marker='o')
        plt.title('Elbow Method for Optimal k')
        plt.xlabel('Number of clusters (k)')
        plt.ylabel('Inertia')
        plt.xticks(range(1, max_k + 1))
        plt.grid()
        plt.show()
    def plot_silhouette_scores(self, X, max_k=10):
        silhouette_scores = []
        for k in range(2, max_k + 1):
            model = KMeans(n_clusters=k, random_state=self.random_state)
            model.fit(X)
            score = silhouette_score(X, model.labels_)
            silhouette_scores.append(score)
        plt.figure(figsize=(10, 6))
        plt.plot(range(2, max_k + 1), silhouette_scores, marker='o')
        plt.title('Silhouette Scores for Different k')
        plt.xlabel('Number of clusters (k)')
        plt.ylabel('Silhouette Score')
        plt.xticks(range(2, max_k + 1))
        plt.grid()
        plt.show()
    def save_model(self, filename):
        import joblib
        joblib.dump(self, filename)
    @staticmethod
    def load_model(filename):
        import joblib
        return joblib.load(filename)
    
# Example usage:
# if __name__ == "__main__":

#     # Load your data
#     data = pd.read_csv('your_data.csv')
#     features = data[['feature1', 'feature2']]  # Replace with your actual feature columns
#     kmeans_model = KMeansModel(n_clusters=3)
#     kmeans_model.fit(features)        
#     kmeans_model.plot_clusters(features)
#     kmeans_model.plot_elbow_curve(features, max_k=10)
#     kmeans_model.plot_silhouette_scores(features, max_k=10)
#     kmeans_model.save_model('kmeans_model.pkl')
#     loaded_model = KMeansModel.load_model('kmeans_model.pkl')
#     print("Cluster Centers:", loaded_model.get_cluster_centers())
#     print("Inertia:", loaded_model.get_inertia())
#     print("Silhouette Score:", loaded_model.get_silhouette_score(features))
#     labels = loaded_model.get_labels()
#     print("Labels:", labels)
#     print("Cluster Centers (Inverse Scaled):", loaded_model.get_cluster_centers())
#     print("Silhouette Score:", kmeans_model.get_silhouette_score(features))
#     kmeans_model.plot_clusters(features, y=labels)
#     kmeans_model.plot_elbow_curve(features, max_k=10)
#     kmeans_model.plot_silhouette_scores(features, max_k=10)
#     kmeans_model.save_model('kmeans_model.pkl')
#     loaded_model = KMeansModel.load_model('kmeans_model.pkl')
#     print("Cluster Centers:", loaded_model.get_cluster_centers())
#     print("Inertia:", loaded_model.get_inertia())
#     print("Silhouette Score:", loaded_model.get_silhouette_score(features))
#     labels = loaded_model.get_labels()
#     print("Labels:", labels)