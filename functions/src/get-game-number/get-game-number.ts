import * as functions from 'firebase-functions';
import {getByAccount} from '../interfaces/getByAccount.interface';
import * as admin from 'firebase-admin';

admin.initializeApp();

const request = require('request');

interface Headers {
  'X-Riot-Token'?: string
}

let headers: Headers = {};

export const getGameNumber = functions.https.onRequest((req, resp) => {

  return admin.database().ref('/api/token').once('value').then(value => {

    headers['X-Riot-Token'] = value.val();

    resp.set('Access-Control-Allow-Origin', '*');

    const {summonerName, championId, server} = req.query;

    request({
      url: `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
      headers: headers
    }, (error: any, response: any, body: any) => {

      if (error) {
        resp.send(error);
        return;
      }

      const getByAccountBody: getByAccount = JSON.parse(body);

      request({
        url: `https://${server}.api.riotgames.com/lol/match/v4/matchlists/by-account/${getByAccountBody.accountId}?champion=${parseInt(championId)}&beginIndex=1000`,
        headers: headers
      }, (error2: any, response2: any, body2: any) => {

        if (error2) {
          resp.sendStatus(400).send(error2);
        }

        const getMatchlistBody: any = JSON.parse(body2);

        if (getMatchlistBody['status'] && getMatchlistBody['status']['status_code'] != 200) {
          resp.send(getMatchlistBody);
          return;
        }

        const totalGames = getMatchlistBody.totalGames;
        resp.send(totalGames.toString());

      });

    });

  });

});
