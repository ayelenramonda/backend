export const calculo= (num)=>{
	let randoms={}
 
	 for( let i=0; i< num; i++){
		 const num = (Math.random()*1000).toFixed(0);
		 if(randoms.hasOwnProperty(num)){
			 randoms[num] += 1
		 }
		 else{
			 randoms[num]=1
		 }
	 }
	 return JSON.stringify(randoms)
 }
 


 process.on('message', (num) => {
    const sum = calculo(num);

    process.send({sum});
});
 
