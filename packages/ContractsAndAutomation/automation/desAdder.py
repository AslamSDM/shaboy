import json


def main():
    games_data=""
    games_description=""
    with open('games.json', 'r') as f:
        games_data = json.load(f)
    with open('description.json', 'r') as f:
        games_description = json.load(f)
    real_finalData=[]
    for x in games_data:
        for y in games_description:
            if x['name']==y['name']:
                x['description']=y['Description']
                real_finalData.append(x)
    with open("realgame_test.json","w") as f:
        json.dump(real_finalData,f)
        
main()
