export const findShortCallers = (inputString) =>{
    const openCalls = {};
    const callDurations = {};
    const inputLines = inputString.split('\n');
    console.log("inputLines: ", inputLines);
    inputLines.forEach(line => {
        const parts = line.split(' ');
        const action = parts[0];
        const caller = parts[1];
        const callee = parts[2];
        const timestamp = parseInt(parts[3], 10);

        if (action === 'call') {
            if(!openCalls[caller]){
                openCalls[caller] = [callee, timestamp];
            }
            else{
                console.log('error message for caller: ', caller);
                alert("caller makes two calls at the same time "); 
            }
        } else if (action === 'hangup') {
            if(openCalls[callee]){
                if(!callDurations[callee]){callDurations[callee] = [0, 0];}
                callDurations[callee][0] += (timestamp - openCalls[callee][1]);
                callDurations[callee][1] += 1;
                delete openCalls[callee];
            }
            else if(openCalls[caller]){
                if(!callDurations[caller]){callDurations[caller] = [0, 0];}
                callDurations[caller][0] += (timestamp - openCalls[caller][1]);
                callDurations[caller][1] += 1;
                delete openCalls[caller];
            }
            else{
                console.log('error message for hangerupper: ', caller);
                alert("hangup initiated even though neither side is in a call!");
            }
        }
    });

    const result = {
        shortCallers: [],
        otherCallers: []
    }

    Object.keys(callDurations).forEach(caller => {
        const [totalDuration, callCount] = callDurations[caller];
        const averageDuration = totalDuration / callCount;
        if (averageDuration < 5) {
            result.shortCallers.push(caller);
        } else {
            result.otherCallers.push(caller);
        }
    });
    
    return result;
}


