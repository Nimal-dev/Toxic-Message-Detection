import re
import nltk
import string
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report
import joblib
 
class CyberbullyingDetector:
    def __init__(self):
        # Download NLTK resources 
        
        # Initialize the vectorizer and classifier
        self.vectorizer = TfidfVectorizer() 
        self.classifier = SVC(kernel='linear')
     
    def preprocess_text(self, text):
        # Remove punctuation
        text = text.translate(str.maketrans('', '', string.punctuation))
        
        # Tokenize text into words
        tokens = nltk.word_tokenize(text.lower())
        
        # Remove stopwords
        stopwords = nltk.corpus.stopwords.words('english')
        tokens = [token for token in tokens if token not in stopwords]
        
        # Remove non-alphabetic characters
        tokens = [re.sub('[^a-zA-Z]', '', token) for token in tokens]
        
        # Remove short words
        tokens = [token for token in tokens if len(token) > 1]
        
        # Join tokens back into a single string
        preprocessed_text = ' '.join(tokens)
        
        return preprocessed_text
    
    def load_data(self, filepath):
        # Load the dataset from CSV file
        data = pd.read_csv(filepath)
        
        # Apply preprocessing to the text column
        data['preprocessed_text'] = data['Text'].apply(self.preprocess_text)
        
        # Split the dataset into features and labels
        self.X = data['preprocessed_text']
        self.y = data['oh_label']
    
    def train(self):
        # Vectorize the text using TF-IDF
        X_vectorized = self.vectorizer.fit_transform(self.X)
        
        # Train the classifier
        self.classifier.fit(X_vectorized, self.y)
    
    def save_model(self, filepath):
        # Save the trained model
        joblib.dump((self.vectorizer, self.classifier), filepath)
    
    def load_model(self, filepath):
        # Load the trained model
        self.vectorizer, self.classifier = joblib.load(filepath)
    
    def predict(self, text):
        # Preprocess the input text
        preprocessed_text = self.preprocess_text(text)
        
        # Vectorize the preprocessed text
        text_vectorized = self.vectorizer.transform([preprocessed_text])
        
        # Make predictions
        prediction = self.classifier.predict(text_vectorized)
        
        return prediction
    
    def evaluate(self, X_test, y_test):
        # Vectorize the test data
        X_test_vectorized = self.vectorizer.transform(X_test)
        
        # Predict on the test set
        y_pred = self.classifier.predict(X_test_vectorized)
        
        # Calculate accuracy and print classification report
        accuracy = accuracy_score(y_test, y_pred)
        print("Accuracy:", accuracy)
        print(classification_report(y_test, y_pred))

# Example usage:
# detector = CyberbullyingDetector()
# detector.load_data('aggression_parsed_dataset.csv')
# detector.train()
# detector.save_model('cyberbullying_model.joblib')

# Load the saved model for further predictions
# new_detector = CyberbullyingDetector()
# new_detector.load_model('cyberbullying_model.joblib')

# # Single prediction using the loaded model
# text = "You're a loser and nobody likes you!"
# prediction = new_detector.predict(text)
# print("Prediction:", prediction)

