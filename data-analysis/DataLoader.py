import pandas as pd

class DataLoader:
    def __init__(self):
        self.filename = 'raw_interview_data.csv'
        self.df = pd.read_csv(self.filename).applymap(lambda x: x if x == x else 0)
    
    def read_filename(self):
        return self.filename
    
    def read_df(self):
        return self.df
    
    def depv_per_condition(self, depv):
        return self.df[self.df['condition'] == 'C1'][depv], self.df[self.df['condition'] == 'C2'][depv], self.df[self.df['condition'] == 'C3'][depv]
        