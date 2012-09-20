/**
 * Game：跑车大冲关
 * description：采用box2d的物理引擎，制作而成的HTML5赛车过关游戏
 * 文件用途：用于申明游戏中使用的全局变量，方便以后的更新维护
 * made by readygo team
 * team member: 周敏如，刘日辉，李伟杰，朱玉韵，孙图彧
 * version:2.3
 *
 */

//全局变量
var bikegame = {
    //设置显示的状态，根据不同的游戏进度
    stateStart: 1,		//游戏开始状态，主要介绍游戏的规则等
    statePlaying: 2,    //正在游戏状态	 
    statelLevelResult:3,//游戏过关状态，包括得分等
    stateGameover:4, 	//游戏结束状态
    currentState: 1, 	//记录当前游戏的状态

    compeltedLevel:0, 	//记录已经完成的关卡数
    currentLevel: 1, 	//记录当前游戏的关卡
    numberOfLevels:5, 	// 游戏中的关卡数
    currentSpeed: 0, 	//瞬时速度
    speedMax:400,    	//设置允许的最高速度，防止游戏速度过高
    timeCount: 0,    	//已用时间，单位1/60 s

    levelScore:0, 		//当前关卡获得的分数
    levelScoreBase:0	//每个关卡计分的基础值，根据各关卡情况，进行调整
}

var canvas;
var ctx;
var canvasWidth;
var canvasHeight;

