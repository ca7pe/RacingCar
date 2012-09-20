/**
 * Game：跑车大冲关
 * description：采用box2d的物理引擎，制作而成的HTML5赛车过关游戏
 * 文件用途：记载游戏的每个关卡的物体的信息，包括位置，大小，类型等
 * made by readygo team
 * team member: 周敏如，刘日辉，李伟杰，朱玉韵，孙图彧
 * version:2.3
 *
 */

bikegame.levels = new Array();

bikegame.levels[1]=[
    {type:"bike", x:50, y:210, levelScoreBase:7},
    {type:"ground", x:120, y:283, width:150, height:25, rotation:0},
	{type:"ground", x:330, y:288, width:80, height:10, rotation:15},
	{type:"ground", x:470, y:306, width:100, height:10, rotation:0},
	{type:"ground", x:630, y:288, width:80, height:10, rotation:-15},
    {type:"ground", x:1020, y:270, width:190, height:25, rotation:0},
    {type:"winWall", x:1150,y:195, width:15, height:30, rotation:0},
    {type:"fallWall", x:650,y:580, width:1300, height:10, rotation:0},
    {type:"flyOutWall", x:1200,y:300, width:10, height:700, rotation:0}
];
bikegame.levels[2]=[
    {type:"bike", x:50, y:210, levelScoreBase:7},
    {type:"ground", x:120, y:283, width:150, height:25, rotation:0},
	{type:"ground", x:330, y:288, width:80, height:10, rotation:15},
	{type:"ground", x:450, y:300, width:100, height:10, rotation:0},
	{type:"ground", x:530, y:288, width:60, height:10, rotation:-15},
	{type:"ground", x:843, y:263, width:50, height:10, rotation:-20},
	{type:"ground", x:890, y:235, width:50, height:10, rotation:-35},
	{type:"ground", x:976, y:190, width:50, height:10, rotation:-20},
	{type:"ground", x:1050, y:173, width:30, height:10, rotation:-5},
	{type:"ground", x:1100, y:173, width:30, height:10, rotation:5},
	{type:"ground", x:1184, y:195, width:60, height:10, rotation:20},
    {type:"winWall", x:1075,y:135, width:15, height:30, rotation:0},
    {type:"fallWall", x:650,y:580, width:1300, height:10, rotation:0},
    {type:"flyOutWall", x:1200,y:300, width:10, height:700, rotation:0}
];
bikegame.levels[3]=[
    {type:"bike", x:50, y:210,levelScoreBase:7},
    {type:"ground", x:190, y:300, width:190, height:25, rotation:0},
	{type:"ground", x:430, y:275, width:50, height:10, rotation:-12},
	{type:"ground", x:496, y:250, width:60, height:10, rotation:-30},
	{type:"ground", x:700, y:210, width:50, height:10, rotation:30},
	{type:"ground", x:750, y:220, width:50, height:10, rotation:10},
	{type:"ground", x:1000, y:228, width:200, height:10, rotation:0},
    {type:"winWall", x:1160,y:177, width:15, height:30, rotation:0},
    {type:"fallWall", x:650,y:580, width:1300, height:10, rotation:0},
    {type:"flyOutWall", x:1200,y:300, width:10, height:700, rotation:0}
];
bikegame.levels[4]=[
    {type:"bike", x:50, y:210,levelScoreBase:7},
    {type:"ground", x:120, y:330, width:150, height:25, rotation:0},
	{type:"ground", x:300, y:310, width:50, height:10, rotation:-12},
	{type:"ground", x:396, y:280, width:60, height:10, rotation:-20},
	{type:"ground", x:480, y:258, width:30, height:10, rotation:-5},
	{type:"ground", x:530, y:258, width:30, height:10, rotation:5},
	{type:"ground", x:614, y:280, width:60, height:10, rotation:20},
	{type:"ground", x:710, y:310, width:50, height:10, rotation:12},
	{type:"ground", x:810, y:310, width:50, height:10, rotation:-10},
	{type:"ground", x:900, y:285, width:50, height:10, rotation:-20},
	{type:"ground", x:940, y:255, width:30, height:10, rotation:-43},
    {type:"ground", x:1100, y:225, width:110, height:25, rotation:0},
    {type:"winWall", x:1160,y:180, width:15, height:30, rotation:0},
    {type:"fallWall", x:650,y:580, width:1300, height:10, rotation:0},
    {type:"flyOutWall", x:1200,y:300, width:10, height:700, rotation:0}
];
bikegame.levels[5]=[
    {type:"bike", x:50, y:210, levelScoreBase:7},
    {type:"ground", x:120, y:290, width:150, height:25, rotation:0},
	{type:"ground", x:420, y:280, width:70, height:10, rotation:-35},
	{type:"ground", x:543, y:231, width:70, height:10, rotation:-10},
	{type:"ground", x:676, y:231, width:70, height:10, rotation:10},
	{type:"ground", x:800, y:280, width:70, height:10, rotation:35},
	{type:"ground", x:980, y:450, width:70, height:10, rotation:30},
    {type:"ground", x:1120, y:500, width:100, height:25, rotation:0},
    {type:"winWall", x:1160,y:465, width:15, height:30, rotation:0},
    {type:"fallWall", x:650,y:580, width:1300, height:10, rotation:0},
    {type:"flyOutWall", x:1200,y:300, width:10, height:700, rotation:0}
];