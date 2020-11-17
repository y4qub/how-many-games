import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as request from 'request';

export const updateChampions = functions.pubsub.schedule('every monday 02:00').onRun(context => {

  return new Promise((resolve, reject) => {

    request('https://ddragon.leagueoflegends.com/api/versions.json', (error, response, body) => {

      if (error) {
        console.error(error);
        reject(error);
      }

      return admin.database().ref('/champions/version').once('value').then(value => {

        const versions: Array<string> = JSON.parse(body);
        const lastVersion = versions[0];
        const currentVersion: string = value.val();

        if (lastVersion != currentVersion) {

          request(`http://ddragon.leagueoflegends.com/cdn/${lastVersion}/data/en_US/champion.json`, (championsError, championsResponse, championsBody) => {

            const jsonChampions = JSON.parse(championsBody);

            // TODO: Make some changes to the structure so only the necessary data goes in
            // TODO: Resolve the 'cannot set headers after send to client' error

            return admin.database().ref('/champions').set(jsonChampions).then(() => {
              console.log('updated');
              resolve('updated');
            });

          });

        } else {

          console.log('already latest');
          resolve('already latest');

        }

      });

    });

  });

});
