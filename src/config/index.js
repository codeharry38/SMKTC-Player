class Config {
    httpError(message){
        if(message.response){
            if(message.response.data.errors){
                const data = message.response.data.errors.map(data =>{
                    return ' '+data.msg;
                });
                return data.toString();                    
            }else if(message.response.status == 404){
                return 'Record Not Found. 404 error code';
            }else{
                return message.response.data.message;
            }
        }else{
            return message;
        }
    }

    stringTrimer(string,number){
        if(string.length > number) return string.substr(0,number)+'...';
        return string;
    }

    /*hoursDiff(dt1, dt2) {
        var diffTime =(dt2 - dt1);
        var hoursDiff = diffTime / (1000 * 3600); 
        return hoursDiff;
    }

    /*setuplocalGameRecords(gameId, stockId, gameData){

    }

    fetchlocalGameRecords(gameId,stockId,Symbol,stockData){
        
        console.log(gameId+","+stockId+","+Symbol+","+stockData);
        localStorage.setItem('gameData', JSON.stringify([
            {
                'GameId':gameId,
            }
    
    ]));

    }*/


}
export default new Config();