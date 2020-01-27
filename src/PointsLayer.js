/****************************************************************************************

    Striking is a simulation of a carrom board play where 2 players can 
    play carrom board (board version) using a browser. 

    Copyright © 2019  QBurst Technologies 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/gpl-3.0.txt />. 

****************************************************************************************/

import {CC, CP} from './globals';
import Utils from './objects/Utils';
import Resources from './resource';
import { throws } from 'assert';
import RoundRect from './RoundRect';
import RectType from './RoundRect';


const PointsLayer = CC.Layer.extend({
  utils: new Utils(),
  sprite: null,
  player1NameLabel: '',
  player1PointsLabel: '',
  player2NameLabel: '',
  player2PointsLabel: '',
  activePlayerLabel: '',
  activePlayerName: '',
  positionValue: '',
  forceValue: '',
  angleValue: '',

  ctor: function () {
    this._super();

    var firstRoundRect = new RoundRect(250, 200, (CC.color(243, 250, 235)), 1, (CC.color(243, 250, 235)), 15,RectType.Top,{x:180, y:5000});
    firstRoundRect.setPosition(CP.v(30,330));
    this.addChild(firstRoundRect,5);

    
    var firstCircle = new RoundRect(50, 50, (CC.color(46, 86, 46)), 1, (CC.color(46, 86, 46)), 23,RectType.Top,{x:180, y:5000});
    firstCircle .setPosition(CP.v(214,575));
    this.addChild(firstCircle ,5); 

   

    var SmallRect1 = new RoundRect(170, 40, (CC.color(255, 247, 214)), 1, (CC.color(165, 105, 80)), 10,RectType.Top,{x:180, y:5000});
    SmallRect1.setPosition(CP.v(60,475));
    this.addChild(SmallRect1,5);

    this.Line1 = this.utils.createLine({x1:250,y1:380,x2:50,y2:380}, 0.5, CC.color(157, 96, 73));
    this.addChild(this.Line1, 5);

    var secondRoundRect = new RoundRect(250, 200, (CC.color(243, 250, 235)), 1, (CC.color(243, 250, 235)), 15,RectType.Top,{x:180, y:5000});
    secondRoundRect.setPosition(CP.v(1030,330));
    this.addChild(secondRoundRect,5);

    var secondCircle = new RoundRect(50,50, (CC.color(46, 86, 46)), 0.5, (CC.color(46, 86, 46)), 24,RectType.Top,{x:180, y:5000});
    secondCircle .setPosition(CP.v(1035,575));
    this.addChild(secondCircle ,5); 
 
    var SmallRect2 = new RoundRect(170, 40, (CC.color(255, 247, 214)), 1, (CC.color(165, 105, 80)), 10,RectType.Top,{x:180, y:5000});
    SmallRect2.setPosition(CP.v(1070,475));
    this.addChild(SmallRect2,5);

    this.Line1 = this.utils.createLine({x1:1050,y1:380,x2:1250,y2:380}, 0.5, CC.color(157, 96, 73));
    this.addChild(this.Line1, 5);

    this.collectedTextP1 = this.utils.createtextLabels('Coins Earned', 'iAmRockFont', 20,
     {x: 140, y: 490});
    this.collectedTextP1.setColor(CC.color(185,141,126));
    this.addChild(this.collectedTextP1, 5);

    this.collectedTextP2 = this.utils.createtextLabels('Coins Earned', 'iAmRockFont', 20,
     {x: 1153, y: 490});
    this.collectedTextP2.setColor(CC.color(185,141,126));
    this.addChild(this.collectedTextP2, 5);

    this.totalCoinsTextP1 = this.utils.createtextLabels('Total Coins :', 'iAmRockFont', 18,
     {x: 100, y: 350});
     this.totalCoinsTextP1.setColor(CC.color(149,101,78));
    this.addChild(this.totalCoinsTextP1, 5);

    this.LineP1 = this.utils.createLine({x1:30,y1:550,x2:270,y2:550},1,cc.Color(243,250,235));
    this.addChild(this.LineP1, 5);
    this.LineP2 = this.utils.createLine({x1:1030,y1:550,x2:1270,y2:550},1,cc.Color(243,250,235));
    this.addChild(this.LineP2, 5);

    this.ColorL1 = this.utils.createColor(cc.color(0,54,1), 90, 350, 420, 700);
    this.addChild(this.ColorL1,4);

    this.ColorL2 = this.utils.createColor(cc.color(0,54,1), 1180, 350, 355, 700);
    this.addChild(this.ColorL2,4);
   
    this.totalCoinsTextP2 = this.utils.createtextLabels('Total Coins :', 'iAmRockFont', 18,
     {x: 1100, y: 350});
     this.totalCoinsTextP2.setColor(CC.color(149,101,78));
    this.addChild(this.totalCoinsTextP2, 5);

    this.P1total = this.utils.createtextLabels('0', 'iAmRockFont', 18,
     {x: 250, y: 350});
    this.P1total.setColor(CC.color(136,80,55));
    this.addChild(this.P1total, 5);

    this.P2total = this.utils.createtextLabels('0', 'iAmRockFont', 18,
     {x: 1250, y: 350});
    this.P2total.setColor(CC.color(136,80,55));
    this.addChild(this.P2total, 5);
    
    this.player1Name = this.utils.createtextLabels('player1', 'makidoFont', 26,
     {x: 90, y: 600});
    this.player1Name.setColor(CC.color(255,247,214));
    this.addChild(this.player1Name, 5);

    
  
    let player1Coin = this.setEarnedCoins('white', {x: 240, y: 600}, 200);
    player1Coin.setScale(1.3);
    this.addChild(player1Coin, 6);
   
    let P1coin1 = this.setEarnedCoins('green', {x: 60, y: 450}, 180);
    P1coin1.setScale(1.0);
    this.addChild(P1coin1, 5);

    let P1coin2 = this.setEarnedCoins('green', {x: 100, y: 450}, 180);
    P1coin2.setScale(1.0);
    this.addChild(P1coin2, 5);

    let P1coin3 = this.setEarnedCoins('green', {x: 140, y: 450}, 180);
    P1coin3.setScale(1.0);
    this.addChild(P1coin3, 5);

    let P1coin4= this.setEarnedCoins('green', {x: 180, y: 450}, 180);
    P1coin4.setScale(1.0);
    this.addChild(P1coin4, 5);

    let P1coin5 = this.setEarnedCoins('green', {x: 220, y: 450}, 180);
    P1coin5.setScale(1.0);
    this.addChild(P1coin5, 5);

    let P1coin6 = this.setEarnedCoins('green', {x: 260, y: 450}, 180);
    P1coin6.setScale(1.0);
    this.addChild(P1coin6, 5);

    let P1coin7 = this.setEarnedCoins('green', {x: 60, y: 410}, 180);
    P1coin7.setScale(1.0);
    this.addChild(P1coin7, 5);

    let P1coin8 = this.setEarnedCoins('green', {x: 100, y: 410}, 180);
    P1coin8.setScale(1.0);
    this.addChild(P1coin8, 5);

    let P1coin9 = this.setEarnedCoins('green', {x: 140, y: 410}, 180);
    P1coin9.setScale(1.0);
    this.addChild(P1coin9, 5);

    
    this.player2Name = this.utils.createtextLabels('player2', 'makidoFont', 26,
     {x: 1200, y: 600});
    this.player2Name.setColor(CC.color(255,247,214));
    this.addChild(this.player2Name, 5);

    let player2Coin = this.setEarnedCoins('black', {x: 1060, y: 600}, 201);
    player2Coin.setScale(1.2);
    this.addChild(player2Coin, 5);

    this.activePlayerName = this.utils.createtextLabels('name', 'makidoFont', 40,
     {x: 1155, y: 85});
    this.activePlayerName.setColor(CC.color(237, 13, 7));
    this.addChild(this.activePlayerName, 5);

    let P2coin1 = this.setEarnedCoins('green', {x:1060, y: 450}, 180);
    P2coin1.setScale(1.0);
    this.addChild(P2coin1, 5);

    let P2coin2 = this.setEarnedCoins('green', {x: 1100, y: 450}, 180);
    P2coin2.setScale(1.0);
    this.addChild(P2coin2, 5);

    let P2coin3 = this.setEarnedCoins('green', {x: 1140, y: 450}, 180);
    P2coin3.setScale(1.0);
    this.addChild(P2coin3, 5);

    let P2coin4= this.setEarnedCoins('green', {x: 1180, y: 450}, 180);
    P2coin4.setScale(1.0);
    this.addChild(P2coin4, 5);

    let P2coin5 = this.setEarnedCoins('green', {x: 1220, y: 450}, 180);
    P2coin5.setScale(1.0);
    this.addChild(P2coin5, 5);

    let P2coin6 = this.setEarnedCoins('green', {x: 1260, y: 450}, 180);
    P2coin6.setScale(1.0);
    this.addChild(P2coin6, 5);

    let P2coin7 = this.setEarnedCoins('green', {x: 1060, y: 410}, 180);
    P2coin7.setScale(1.0);
    this.addChild(P2coin7, 5);

    let P2coin8 = this.setEarnedCoins('green', {x: 1100, y: 410}, 180);
    P2coin8.setScale(1.0);
    this.addChild(P2coin8, 5);

    let P2coin9 = this.setEarnedCoins('green', {x: 1140, y: 410}, 180);
    P2coin9.setScale(1.0);
    this.addChild(P2coin9, 5);

    // this.totalCoinsTextP2 = this.utils.createtextLabels('Total Points', 'iAmRockFont', 20,
    //  {x: 120, y: 150});
    // this.addChild(this.totalCoinsTextP2, 5);

    return true;
  },

  setPlayerName: function (name, playerId, p1) {
    if (playerId === p1) {
      this.player1Name.setString(name);
    } else {
      this.player2Name.setString(name);
    }
  },

  setPlayerPoints: function (points, playerId, p1) {
    if (playerId === p1) {
      this.P1total.setString(points);
    } else {
      this.P2total.setString(points);
    }
  },

  setActivePlayer: function (name) {
    this.activePlayerName.setString(name);
  },

  setActiveForce: function (position, force, angle, playerId, p1) {
    if (playerId === p1) {
      this.positionValueP1.setString(position);
      this.forceValueP1.setString(force);
      this.angleValueP1.setString(angle);
    } else {
      this.positionValueP2.setString(position);
      this.forceValueP2.setString(force);
      this.angleValueP2.setString(angle);
    }
  },

  setEarnedCoins: function(color, coinPosition,tagId){
      this.coins = new CC.Sprite(Resources.getCoinColor(color));
      this.coins.setPosition(CP.v(coinPosition.x, coinPosition.y));
      this.coins.setTag(tagId, true);
      this.coins.setScale(0.7);
      return this.coins;
  }

});

export default PointsLayer;
