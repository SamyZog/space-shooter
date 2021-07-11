(self.webpackChunkspace_shooter=self.webpackChunkspace_shooter||[]).push([[143],{747:(e,t,n)=>{"use strict";var o,i=document.querySelector(".hud"),s=i.querySelector(".hud__shooter-lives"),r=i.querySelector(".hud__score"),a=document.querySelector(".hud__cooldown-meter"),c=document.querySelector(".hud__bar"),l=document.querySelector(".space"),h=(l.getBoundingClientRect().top,l.getBoundingClientRect().bottom),u=l.getBoundingClientRect().left,d=l.getBoundingClientRect().right,y=document.querySelector(".modal"),m=y.querySelector(".modal__main-msg"),f=y.querySelector(".modal__stats"),p=y.querySelector(".modal__action-box"),v=y.querySelector(".modal__stats-text-time"),g=y.querySelector(".modal__stats-text-score"),S=y.querySelector(".modal__action-btn"),w=document.querySelector(".settings"),k=w.querySelectorAll(".settings__difficulty-options > button"),b=w.querySelectorAll(".settings__fighter-options > div"),x=w.querySelectorAll(".settings__canvas-options > button"),C=document.querySelector(".start__button");function _(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}C.disabled=!0;var E={difficultySettings:{EASY:{difficulty:"easy",enemySpeed:.5,laserSpeed:2e3,enemyColumns:8,enemyRows:4,enemyLaserColor:"#5F9EA0",height:42,width:46.5,lives:3},MODERATE:(o={difficulty:"moderate",enemySpeed:1,laserSpeed:1500,enemyColumns:10,enemyRows:4,enemyLaserColor:"#FF8C00",height:42,width:46.5},_(o,"width",51.5),_(o,"lives",2),o),HARD:{difficulty:"hard",enemySpeed:1.5,laserSpeed:1e3,enemyColumns:12,enemyRows:5,enemyLaserColor:"#F0FFFF",height:42,width:46.5,lives:1}},shooterSettings:{RED:{laserSpeed:2e3,laserCoolDownPeriod:1500,color:"red",speed:d/300},BLUE:{laserSpeed:1500,laserCoolDownPeriod:2e3,color:"blue",speed:d/450},GREEN:{laserSpeed:1e3,laserCoolDownPeriod:2500,color:"green",speed:d/600}}};function L(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}const P=function(){function e(t){var n=t.enemyDiv,o=t.id,i=t.difficulty,s=t.laserSpeed,r=t.enemyLaserColor,a=t.columns;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.enemyDiv=n,this.isDead=!1,this.id=o,this.difficulty=i,this.laserSpeed=s,this.enemyLaserColor=r,this.columns=a,this.canShoot=!0,this.enemyX=null,this.enemyY=null,this.enemyWidth=null,this.timeOut=null}var t,o;return t=e,(o=[{key:"interval",get:function(){return Math.ceil(3e3*Math.random())}},{key:"randomizeShooting",value:function(){var e=this;this.canShoot&&(this.interval,this.timeOut=setTimeout((function(){e.start(),e.randomizeShooting()}),this.interval))}},{key:"start",value:function(){var e=document.querySelectorAll(".enemy-cell");this._isPresent(e)&&this._hasClearShot(e)&&this.shoot()}},{key:"_hasClearShot",value:function(e){for(var t=this.id+this.columns;t<e.length;t+=this.columns)if(e[t].hasChildNodes())return!1;return!0}},{key:"_isPresent",value:function(e){return e[this.id].hasChildNodes()}},{key:"shoot",value:function(){this._setLiveEnemyPosition(),this._createLaser()}},{key:"_setLiveEnemyPosition",value:function(){this.enemyY=this.enemyDiv.getBoundingClientRect().top,this.enemyX=this.enemyDiv.getBoundingClientRect().left}},{key:"_createLaser",value:function(){var e=document.createElement("div");e.classList.add("enemy-laser"),e.style.backgroundColor=this.enemyLaserColor,e.style.top="".concat(this.enemyY+this.enemyDiv.offsetHeight,"px"),e.style.left="".concat(this.enemyX+this.enemyDiv.offsetWidth/2,"px"),e.animate([{transform:"translateY(".concat(h,"px)")}],{duration:this.laserSpeed,fill:"forwards"}).finished.then((function(t){e.remove()})),l.appendChild(e)}},{key:"init",value:function(){var e=this;setTimeout((function(){return e.randomizeShooting()}),this.interval)}},{key:"_setImage",value:function(){n(725)("./".concat(this.difficulty,".png")).then((function(e){}))}}])&&L(t.prototype,o),e}();function D(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function R(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}const A=function(){function e(t){var n=t.difficulty,o=t.enemySpeed,i=t.laserSpeed,s=t.enemyColumns,r=t.enemyRows,a=t.enemyLaserColor,c=t.height,l=t.width;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.enemyBox=null,this.enemyBoxRect=null,this.enemyBoxWidth=null,this.difficulty=n,this.enemySpeed=o,this.laserSpeed=i,this.enemyColumns=s,this.enemyRows=r,this.enemyLaserColor=a,this.height=c,this.width=l,this.direction=1,this.top=0,this.leftStartPosition=0,this.currentLeftPosition=0,this.rightStartPosition=null,this.currentRightPosition=null}var t,n;return t=e,(n=[{key:"actions",value:function(){this._move()}},{key:"_move",value:function(){this._moveHorizontally(),this._moveVertically()}},{key:"_moveHorizontally",value:function(){var e;1===this.direction&&(e=this.currentLeftPosition+=this.enemySpeed),-1===this.direction&&(e=this.currentRightPosition-=this.enemySpeed),this.enemyBox.style.left="".concat(e,"px")}},{key:"_moveVertically",value:function(){this.enemyBoxRect=this.enemyBox.getBoundingClientRect(),this.enemyBoxRect.left<u&&(this.top+=this.height,this.enemyBox.style.top="".concat(this.top,"px"),this.enemySpeed+=.25,this.currentLeftPosition=this.leftStartPosition,this.direction=1),this.enemyBoxRect.right>d&&(this.top+=this.height,this.enemyBox.style.top="".concat(this.top,"px"),this.enemySpeed+=.25,this.currentRightPosition=this.rightStartPosition,this.direction=-1)}},{key:"init",value:function(){var e=document.createElement("div");this.enemyBox=e,e.classList.add("enemy-box"),e.style.gridTemplateColumns="repeat(".concat(this.enemyColumns,", ").concat(this.width,"px)"),e.style.gridTemplateRows="repeat(".concat(this.enemyRows,", ").concat(this.height,"px)"),this._populateEnemyContainer(),l.appendChild(e),this.enemyBoxWidth=e.offsetWidth,this.leftStartPosition=0,this.currentLeftPosition=0,this.rightStartPosition=d-this.enemyBoxWidth,this.currentRightPosition=d-this.enemyBoxWidth}},{key:"totalEnemies",get:function(){return this.enemyColumns*this.enemyRows}},{key:"_populateEnemyContainer",value:function(){var e,t=this;(e=Array(this.totalEnemies),function(e){if(Array.isArray(e))return D(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return D(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?D(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()).forEach((function(e,n){var o=document.createElement("div");o.classList.add("enemy-cell");var i=document.createElement("div");i.classList.add("enemy"),o.appendChild(i),t.enemyBox.appendChild(o);var s=new P({enemyDiv:i,id:n,difficulty:t.difficulty,laserSpeed:t.laserSpeed,enemyLaserColor:t.enemyLaserColor,columns:t.enemyColumns,rows:t.enemyRows});s.init(),q.enemyInstances.push(s)}))}}])&&R(t.prototype,n),e}();function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=new Array(t);n<t;n++)o[n]=e[n];return o}function T(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function O(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}const H=function(){function e(t){var n=this,o=t.laserSpeed,i=t.laserCoolDownPeriod,s=t.color,r=t.speed;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),O(this,"_incrementCoolDownBarHeightLevel",(function(){n.canShoot&&(c.style.top="-".concat(n.coolDownBarHeightLevel+=n.incrementLevel,"%"))})),this.audio=null,this.shooter=null,this.laserSpeed=o,this.laserCoolDownPeriod=i,this.lives=q.difficultySettings.lives,this.color=s,this.speed=r,this.canShoot=!0,this.coolDownBarHeightLevel=0,this.incrementLevel=20,this.decrementLevel=1,this.boundaries=null,this.maxFireRateReachTime=null,this.isDead=!1,this.x=null,this.y=null,this.controlKeys=O({ArrowLeft:!1,ArrowRight:!1,ArrowUp:!1,ArrowDown:!1}," ",!1)}var t,o;return t=e,(o=[{key:"showToolTip",value:function(e){var t=this;this.toolTipDiv.innerText=e,this.toolTipDiv.animate([{top:"-50%",right:"-50%",opacity:1}],{duration:500}).finished.then((function(e){t.toolTipDiv.innerText="",t.toolTipDiv.style.opacity="0"}))}},{key:"currentPosition",set:function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,i,s=[],r=!0,a=!1;try{for(n=n.call(e);!(r=(o=n.next()).done)&&(s.push(o.value),!t||s.length!==t);r=!0);}catch(e){a=!0,i=e}finally{try{r||null==n.return||n.return()}finally{if(a)throw i}}return s}}(t,n)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=o[0],s=o[1];this.shooter.style.transform="translate(".concat(i,"px, ").concat(s,"px")}},{key:"actions",value:function(){this._move()}},{key:"shoot",value:function(){var e=this;if(this.coolDownBarHeightLevel>100)return this.canShoot=!1,this.maxFireRateReachTime=Date.now(),void setTimeout((function(){e.coolDownBarHeightLevel=1,e.canShoot=!0}),this.laserCoolDownPeriod);this._incrementCoolDownBarHeightLevel(),this._setLiveShooterPosition(),this._createLaser()}},{key:"_setLiveShooterPosition",value:function(){this.shooterY=this.shooter.getBoundingClientRect().top,this.shooterX=this.shooter.getBoundingClientRect().left}},{key:"_createLaser",value:function(){var e=document.createElement("div");e.classList.add("laser"),e.style.backgroundColor="var(--".concat(this.color,")"),e.style.top="".concat(this.shooterY-e.offsetHeight,"px"),e.style.left="".concat(this.shooterX+this.shooterWidth/2,"px"),e.animate([{transform:"translateY(-".concat(h,"px)")}],{duration:this.laserSpeed,fill:"forwards"}).finished.then((function(t){e.remove()})),l.appendChild(e)}},{key:"_move",value:function(){this.controlKeys.ArrowUp&&(this.x=this.x,this.y-=this.speed),this.controlKeys.ArrowDown&&(this.x=this.x,this.y+=this.speed),this.controlKeys.ArrowLeft&&(this.x-=this.speed,this.y=this.y),this.controlKeys.ArrowRight&&(this.x+=this.speed,this.y=this.y),this.currentPosition=[this.x,this.y],this._checkLimits()}},{key:"_checkLimits",value:function(){var e=this.boundaries;this.x<e.leftEdge&&(this.x=e.leftEdge),this.x>e.rightEdge&&(this.x=e.rightEdge),this.y<e.topEdge&&(this.y=e.topEdge),this.y>e.bottomEdge&&(this.y=e.bottomEdge),this.currentPosition=[this.x,this.y]}},{key:"init",value:function(){this.spaceRect=l.getBoundingClientRect();var e=document.createElement("div");this.shooter=e,e.classList.add("shooter");var t=document.createElement("div");this.toolTipDiv=t,t.classList.add("shooter__tooltip"),e.appendChild(t),l.appendChild(e),this.shooterWidth=e.offsetWidth,this._setImage(),this._setLives(),this._setActionHandlers(),this._setInitialPosition(),this._setMovementBoundaries()}},{key:"_setImage",value:function(){var e=this;n(336)("./".concat(this.color,".png")).then((function(t){e.shooter.style.backgroundImage="url(".concat(t.default,")"),document.querySelector(".hud__shooter-img").style.backgroundImage="url(".concat(t.default,")")}))}},{key:"_setLives",value:function(){s.innerText="x".concat(this.lives)}},{key:"_setInitialPosition",value:function(){this.x=this.spaceRect.right/2-this.shooter.offsetWidth/2,this.y=this.spaceRect.bottom-this.shooter.offsetHeight,this.currentPosition=[this.x,this.y]}},{key:"_setMovementBoundaries",value:function(){this.boundaries={topEdge:.75*this.spaceRect.bottom,bottomEdge:this.spaceRect.bottom-this.shooter.offsetHeight,leftEdge:this.spaceRect.left,rightEdge:this.spaceRect.right-this.shooter.offsetWidth}}},{key:"_setActionHandlers",value:function(){var e=this;document.body.addEventListener("keydown",(function(t){"ArrowUp"===t.key&&(e.controlKeys[t.key]=!0),"ArrowDown"===t.key&&(e.controlKeys[t.key]=!0),"ArrowLeft"===t.key&&(e.controlKeys[t.key]=!0),"ArrowRight"===t.key&&(e.controlKeys[t.key]=!0),"Shift"===t.key&&e.activateShield()})),document.body.addEventListener("keyup",(function(t){if("ArrowLeft"===t.key&&(e.controlKeys[t.key]=!1),"ArrowRight"===t.key&&(e.controlKeys[t.key]=!1),"ArrowUp"===t.key&&(e.controlKeys[t.key]=!1),"ArrowDown"===t.key&&(e.controlKeys[t.key]=!1)," "===t.key){if(!e.canShoot)return;e.shoot(),e.controlKeys[t.key]=!1}}))}}])&&T(t.prototype,o),e}(),I=function e(t){var n=this,o=t.difficultySettings,u=t.shooterSettings;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.shooter=null,this.enemyBox=null,this.enemies=[],this.startTime=null,this.gameEnded=!1,this.startGameMsgs={ready:"Get Ready!",go:"GO!"},this.playerScore=0,this.enemyInstances=[],this.shooterSettings=u,this.difficultySettings=o,this.paused=!1,this.init=function(){var e=n.startGameMsgs.ready;y.style.display="flex",y.style.width="30vw",f.style.display="none",p.style.display="none",m.innerText=e,setTimeout((function(){e=n.startGameMsgs.go,m.innerText=e,setTimeout((function(){n.resetModal(),n.moveCanvas(),n.shooter=new H(u),n.shooter.init(),n.enemyBox=new A(o),n.enemyBox.init(),n.setPauseHandler(),n.startGame(),a.style.display="block",r.innerText=0,n.startTime=Date.now()}),1e3)}),1e3)},this.resetModal=function(){y.style.display="none",y.style.width="auto",f.style.display="grid",p.style.display="flex",m.innerText=""},this.moveCanvas=function(){l.animate([{backgroundPositionY:0},{backgroundPositionY:"256px"}],{duration:1e3,iterations:1/0})},this.setPauseHandler=function(){document.addEventListener("keyup",n.handlePause)},this.startGame=function(){requestAnimationFrame(n.gameLoop)},this.gameLoop=function(){n.paused||(n.shooter.actions(),n.enemyBox.actions(),n.monitorEnemyHit(),n.monitorShooterHit(),n.monitorEnemyPosition(),n.decrementCoolDownBarHeightLevel(),requestAnimationFrame(n.gameLoop))},this.decrementCoolDownBarHeightLevel=function(){n.shooter.canShoot&&(n.shooter.coolDownBarHeightLevel<0?n.shooter.coolDownBarHeightLevel=0:c.style.top="-".concat(n.shooter.coolDownBarHeightLevel-=n.shooter.decrementLevel,"%"))},this.handlePause=function(e){n.gameEnded||"p"!==e.key&&"P"!==e.key||(n.paused=!n.paused,n.paused&&n.pauseAction(),n.paused||n.unPauseAction())},this.pauseAction=function(){n.paused=!0,document.getAnimations().forEach((function(e){return e.pause()})),n.shooter.canShoot=!1,n.enemyInstances.forEach((function(e){e.canShoot=!1,clearTimeout(e.timeOut)})),f.style.display="none",p.style.display="none",y.style.display="flex",y.style.width="30vw",m.innerText="PAUSED!"},this.unPauseAction=function(){n.paused=!1,n.resetModal(),document.getAnimations().forEach((function(e){return e.play()})),n.shooter.canShoot=!0,n.startGame(),n.enemyInstances.forEach((function(e){e.canShoot=!0,e.randomizeShooting()}))},this.updateScore=function(){n.playerScore+=100,r.innerText=n.playerScore},this.updateLives=function(){n.shooter.lives-=1,s.innerText="x".concat(n.shooter.lives)},this.endGame=function(e){n.pauseAction(),n.resetModal();var t=Date.now()-n.startTime,o=new Date(t).getMinutes(),i=new Date(t).getSeconds(),s=new Date(t).getMilliseconds(),r=o<10?"0".concat(o):o,a=i<10?"0".concat(i):i,c=s<100?"0".concat(s):s;y.style.display="flex",v.innerText="".concat(r,":").concat(a,":").concat(c),g.innerText="".concat(n.playerScore),m.innerText="YOU ".concat(e,"!!!")},this.checkProximity=function(e,t){return e.top>t.bottom||e.right<t.left||e.left>t.right||e.bottom<t.top},this.monitorEnemyHit=function(){document.querySelectorAll(".laser").forEach((function(e){for(var t=e.getBoundingClientRect(),o=0;o<n.enemyInstances.length;o++){var i=n.enemyInstances[o].enemyDiv.getBoundingClientRect();if(!n.checkProximity(t,i)){n.updateScore(),n.enemyInstances[o].enemyDiv.remove(),n.enemyInstances[o].isDead=!0,n.enemyInstances.splice(o,1),e.remove(),0===n.enemyInstances.length&&(n.endGame("WON"),n.gameEnded=!0);break}}}))},this.monitorShooterHit=function(){for(var e=document.querySelectorAll(".enemy-laser"),t=n.shooter.shooter.getBoundingClientRect(),o=0;o<e.length;o++){var i=e[o].getBoundingClientRect();if(!n.checkProximity(t,i)){e[o].remove(),n.updateLives(),n.shooter.showToolTip(-1),n.shooter.lives<1&&(n.endGame("LOST"),n.gameEnded=!0,n.shooter.shooter.remove());break}}},this.monitorEnemyPosition=function(){for(var e=n.shooter.shooter.getBoundingClientRect(),t=0;t<n.enemyInstances.length;t++){var o=n.enemyInstances[t].enemyDiv.getBoundingClientRect();if(o.bottom>h-i.offsetHeight||!n.checkProximity(e,o)){n.endGame("LOST");break}}}};var q,M=!1,U=!1,F=!1;!function(){var e={difficultySettings:{},shooterSettings:{}};k.forEach((function(e){e.addEventListener("click",a)})),b.forEach((function(e){e.addEventListener("click",c)})),x.forEach((function(e){e.addEventListener("click",h)})),C.addEventListener("click",(function(){q=new I(e),w.style.display="none",i.style.height="5vh",l.style.height="95vh",q.init()})),S.addEventListener("click",(function(){location.reload()}));var t=function(e,t){switch(t){case"difficulty":e.style.color="var(--tint2)";break;case"fighter":e.style.borderColor="var(--".concat(e.dataset.color,")");break;case"canvas":e.style.borderColor="var(--tint2)"}},o=function(e){switch(e){case"difficulty":k.forEach((function(e){e.style.color="var(--light)"}));break;case"fighter":b.forEach((function(e){e.style.borderColor="var(--tint1)"}));break;case"canvas":x.forEach((function(e){e.style.borderColor="var(--tint1)"}))}},s=function(){M&&U&&F&&(C.disabled=!1,C.focus())},r=function(t,n){e[t]=E[t][n]};function a(){var e="difficulty";M=!0,o(e),t(this,e),r("difficultySettings",this.id),s()}function c(){var e="fighter";U=!0,o(e),t(this,e),r("shooterSettings",this.dataset.color.toUpperCase()),s()}function h(){var e,i="canvas";F=!0,e=this.id,n(16)("./".concat(e.toLowerCase(),".png")).then((function(e){l.style.backgroundImage="url(".concat(e.default,")")})),o(i),t(this,i),s()}}()},725:(e,t,n)=>{var o={"./easy.png":[316,316],"./hard.png":[683,683],"./moderate.png":[631,631]};function i(e){if(!n.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],i=t[0];return n.e(t[1]).then((()=>n.t(i,17)))}i.keys=()=>Object.keys(o),i.id=725,e.exports=i},336:(e,t,n)=>{var o={"./blue.png":[819,819],"./green.png":[902,902],"./red.png":[536,536]};function i(e){if(!n.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],i=t[0];return n.e(t[1]).then((()=>n.t(i,17)))}i.keys=()=>Object.keys(o),i.id=336,e.exports=i},16:(e,t,n)=>{var o={"./black.png":[177,177],"./blue.png":[956,956],"./darkpurple.png":[136,136],"./purple.png":[869,869]};function i(e){if(!n.o(o,e))return Promise.resolve().then((()=>{var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}));var t=o[e],i=t[0];return n.e(t[1]).then((()=>n.t(i,17)))}i.keys=()=>Object.keys(o),i.id=16,e.exports=i}},e=>{"use strict";e(e.s=747)}]);