//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {API_KEY} = process.env
const axios = require('axios');
const { response } = require('./src/app.js');




const getApiData = (() => { 
   
  axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  // .then(  (element) => { return element.data.map(e => e.temperament)})
  .then( response => { return new Set( response.data.flatMap( e => e.temperament && e.temperament.split(", ")))}
  )
  .then( temperaments => console.log(temperaments) )


// ---------------------------------------------------------
//   allData = allData.data.map( (element) =>  {
//     return {
//      id: element.id,
//      name: element.name,
//      temperamnets: element.temperament
//     }
//   }
//  )
//   return allData
});
getApiData()
// -----------------------------------------------------------------------------------------------------

// getApiData().then( (element) =>  element.data.flatMap(e => e.temperament).split(','))
// .then( res => console.log('log from then',res))

// -------------------------------------------------------------------------------------------------------

// getApiData().then( (element) => console.log(new Set(element.data.flatMap(e => e.temeperament))))

// --------------------------------------------------------------------------------------------------------

// const allDogsTemperaments = async () => {  
 
//    let apiData =  await getApiData()
//     console.log('log desde allDogsTemperaments' ,  apiData)  
//   ----------------------------------------------------------
//   // .then( temperaments  => temperaments.map( (element) => {
//   //      return element.temperaments  
//   //     }));
//   //  console.log(temperaments)
//   -----------------------------------------------------------
//   // temperaments = temperaments.map( (element) => {
//   //     return element.temperaments
//   //   }
//   // )
//   // console.log(temperaments)
//   // return temperaments
//   -------------------------------------------------------------
//   // let alltemperaments =  temperaments.map((element)  => {
//   //   return element.temperaments
//   // })
//   // console.log(alltemperaments)
//   --------------------------------------------------------------
  //temperaments = Promise.all(temperaments.flatMap( (element) =>  [ element.temperament ] ))
// }
// ------------------------------------------------------------------------------------------------



// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});
