import random
import json
def dumper():
    data = []
    with open("games.txt","r") as file:
        data = file.readlines()
    dict_obj_arr=[]
    for x in data:
        dict_obj_arr.append({
            "name":x.replace("\n",""),
            "supply":random.randint(10,50)
        })
        
    with open("games.json","w") as file:
        json.dump(dict_obj_arr,file)

def game_range_finder():
    pushed=[]
    prev_end=-1
    with open("games.json","r") as file:
        data = json.load(file)

        for x in data:
            pushed.append({
                "name":x['name'],
                "supply":x['supply'],
                "init":prev_end+1,
                "end":prev_end+x['supply']
            })
            prev_end=prev_end+x['supply']
    with open("games_init.json","w") as file :
        json.dump(pushed,file)
game_range_finder()