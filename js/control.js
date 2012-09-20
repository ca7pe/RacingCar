/**
 * Game：跑车大冲关
 * description：采用box2d的物理引擎，制作而成的HTML5赛车过关游戏
 * 文件用途：游戏的控制执行文件，包含关卡的切换，游戏的场景设置，游戏的通关等功能
 * made by readygo team
 * team member: 周敏如，刘日辉，李伟杰，朱玉韵，孙图彧
 * version:2.3
 *
 */

/**
 * load函数
 * 增加整个界面对各元素的监听事件，从而根据监听进行相应的操作
 * 一下为增加监听事件
 * 1.监听开始界面“play”按钮，点击进入游戏
 * 2.监听游戏界面 键盘操作，实现AD键驱动车子前进，R键重置游戏
 * 3.监听游戏通关界面的“重来”“关卡”“下一关”的操作。实现响应的游戏转向
 * 3.监听游戏关卡选择面板的关卡图标。点击进入相关的游戏关卡
 */
$(function(){

    //设置游戏的为开始状态
    bikegame.currentState = bikegame.stateStart;
	//显示规则
	rulesAnimate();

    //监听键盘事件，确定车的前进方向和游戏的重置
    $(document).keydown(function(e){
        switch(e.keyCode){
            case 68: //按D，则前进，D的ASCII码为68
                updateSpeed();
                if(bikegame.currentSpeed < bikegame.speedMax){
                    var force = new b2Vec2(5000000, 0);
                    bikegame.bike.ApplyForce(force, bikegame.bike.GetCenterPosition());
                }
                break;
            case 65://按A，则前进，A的ASCII码为65
                updateSpeed();
                if(bikegame.currentSpeed < bikegame.speedMax){
                    var force = new b2Vec2(-5000000,0);
                    bikegame.bike.ApplyForce(force, bikegame.bike.GetCenterPosition());
                }
                break;
            case 82://按R，则重置游戏的状态，R的ASCII码为82
                restartGame(bikegame.currentLevel);
                break;
        }

    });

    //设置点击进入游戏状态,判断鼠标点击#play按键即可进入游戏
    $('#play').click(function(){
        if(bikegame.currentState == bikegame.stateStart){
            bikegame.currentState = bikegame.statePlaying;

            //进入游戏状态之后，修改页面显示的元素
            showPlayingUI();

            //初始化游戏状态~
            restartGame(bikegame.currentLevel);
            step();
        }
    });

    //对levelResult界面中的“重来”按钮进行监听。从而确定重新游戏
    $('#again').click(function(){
        restartGame(bikegame.currentLevel);
        showPlayingUI();
    });

    //对levelResult界面中的“下一关”按钮进行监听。从而进入下一关游戏
    $('#next').click(function(){
        restartGame(bikegame.currentLevel+1);
        bikegame.currentLevel = bikegame.currentLevel + 1;
        showPlayingUI();
    });

    //对levelResult界面中的“关卡”按钮进行监听。从而进入关卡选择页面
    $('#menu').click(function(){
        showLevelSelectUI();
        var $temp = $('#levelPanel').children();
        for(var i = 0; i <= bikegame.compeltedLevel; i++){
            $($temp[i]).removeClass().addClass('finish');
			$($temp[i]).find("p").css('display','block');
        }
    });

    //对levelPanel界面中的各个关卡按钮进行监听。从而进入选择不同关卡进入游戏
    $('#levelPanel').children('div').click(function(){
        if(this.id < bikegame.compeltedLevel + 1){
            restartGame(this.id);
            showPlayingUI();
        }else if(this.id == bikegame.compeltedLevel + 1){
            restartGame(bikegame.currentLevel+1);
            bikegame.currentLevel = bikegame.currentLevel + 1;
            showPlayingUI();
        }
    });

    //增加对replay的按钮的监听，从而重设游戏状态
    $('#replay').click(function(){
        restartGame(bikegame.currentLevel);
    });

    //日志输出，确认游戏初始化成功
    console.log("The world is created",bikegame.world);

    // 建立canvas对象
    canvas = document.getElementById('game');
    ctx = canvas.getContext('2d');
    canvasWidth = parseInt(canvas.width);
    canvasHeight = parseInt(canvas.height);

});

/*
 * 行动操作函数
 * 驱使box2d中的物体按照时间动起来，如果到达终点，则在日志中输出结果，并进入下一关卡
 * 无传入值
 */
function step() {
    bikegame.world.Step(1.0/60, 1); //设置step的时间为1/60s
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    drawWorld(bikegame.world, ctx);

    setTimeout(step, 10);
    //更新车子的速度
    updateSpeed();
    //更新计时器
    updateTimer();

    //检测当前各物体的状态，并根据状态确定游戏状态
    for(var i = bikegame.world.GetContactList(); i != null; i = i.GetNext()){
        var body1 = i.GetShape1().GetBody();
        var body2 = i.GetShape2().GetBody();

        //判断碰撞的两个物体是否为小车和终点的墙
        checkWin(body1, body2);
        //判断坠落
        checkFall(body1, body2);
		//判断飞出
		checkFlyOut(body1, body2);
    }
}

/*
 * 重置游戏为初始状态
 * 传入值：
 * level：当前处在的关卡
 * 返回：初始化对于关卡的box2d世界~
 */
function restartGame(level){
    //更新等级界面
    updateLevelUI(level);
    //创建整个模型
    bikegame.world = createWorld();

    //重置当前关卡参数
    bikegame.levelScore = 0;
    bikegame.timeCount = 0;

    //从level信息中读取关卡元件的信息
    for(var i=0; i < bikegame.levels[level].length; i++){
        var obj = bikegame.levels[level][i];
        //根据不同的类型设置物体~
        setObject(obj);
    }
}

/*
 * 更新车子速度的函数
 * 无输入
 * 结果：车子当前的速度存在currentSpeed的变量中
 *       在界面的进度条中显示速度的大小
 */
function updateSpeed(){
    //计算速度的大小
    var xSpeed = bikegame.bike.GetLinearVelocity().x;
    var ySpeed = bikegame.bike.GetLinearVelocity().y
    bikegame.currentSpeed = Math.sqrt(Math.pow(xSpeed,2) + Math.pow(ySpeed,2));
	if(bikegame.currentSpeed <= bikegame.speedMax){
		$('.speed-value').width(bikegame.currentSpeed/bikegame.speedMax * 100 + '%');
	}else {
		$('.speed-value').width('100%');
	}
}

/*
 * 更新当前关卡所用的时间
 * 无输入
 * 结果：当前运行时间timecount
 *       在界面的进度条中显示时间的变化，以整秒为单位，取上限
 */
function updateTimer(){
    bikegame.timeCount++;
    $("#timeCount").text(Math.ceil(bikegame.timeCount / 60) );
}

/*
 * 检测车子是否坠落
 * 传入两个物体实例
 * 结果：如果车子坠落，则重置游戏状态
 *       如果不坠落，则无操作
 */
function checkFall(body1, body2){
    if((body1 == bikegame.bike && body2 == bikegame.gameFallWall) ||
        (body1 == bikegame.gameFallWall && body2 == bikegame.bike))
    {
        restartGame(bikegame.currentLevel);
    }
}

/*
 * 检测车子是否飞出边界
 * 传入两个物体实例
 * 结果：如果车子飞出，则重置游戏状态
 *       否则无操作
 */
function checkFlyOut(body1, body2){
    if((body1 == bikegame.bike && body2 == bikegame.gameFlyOutWall) ||
        (body1 == bikegame.gameFlyOutWall && body2 == bikegame.bike))
    {
        restartGame(bikegame.currentLevel);
    }
}
/*
 * 检测车子是否到达终点
 * 传入两个物体实例
 * 结果：如果车子到达终点，则进入游戏成绩页面
 *       如果没有到达，则无操作
 */
function checkWin(body1, body2){
    if((body1 == bikegame.bike && body2 == bikegame.gameWinWall) ||
        (body1 == bikegame.gameWinWall && body2 == bikegame.bike))
    {
        //更新当前关卡信息
        updateLevelInfo();
        //计算关卡得分
        calculateScore();
        //跳转至显示结构关卡
        if(bikegame.currentLevel < bikegame.numberOfLevels &&  bikegame.currentState == bikegame.statelLevelResult){
            showLevelResultUI();
            bikegame.world = createWorld();
        }else {
            showGameOver();
            bikegame.world = createWorld();
        }
        // console.log("level Passed!");
    }
}

/*
 * 更新过关之后的关卡信息
 * 无输入
 * 结果： 完成的level设置为最大值
 *        更改游戏状态为显示游戏结果状态
 */
function updateLevelInfo(){
    if(bikegame.currentLevel > bikegame.compeltedLevel){
        bikegame.compeltedLevel = bikegame.currentLevel;
    }
    bikegame.currentState = bikegame.statelLevelResult;
}

/*
 * 计算当前关卡获得的分数，计算公式的设计参考文档
 * 无输入
 * 结果： 设置分数到levelScore中
 */
function calculateScore(){
    var base = bikegame.levelScoreBase;
    var time = Math.ceil(bikegame.timeCount/60);
    var score = 3000 + [1-(time/base)>0 ? (1-time/base) : 0] * 2000;
    bikegame.levelScore = Math.ceil(score);
}

/*
 * 更新关卡相关的UI信息
 * level：要更新到的level
 * 结果： 更新level等级字样，更新背景图片
 */
function updateLevelUI(level){
    $('#level').html("Level "+ level );
    $('#game').removeClass().addClass('gamebg_level'+level);
}

/*
 * 设置世界中物体
 * obj：传入要创建的物体
 * 结果：在世界中创建对应类型的物体
 */
function setObject(obj){
    if(obj.type == "bike"){
        bikegame.bike = createBikeAt(bikegame.world,obj.x, obj.y);
        bikegame.levelScoreBase = obj.levelScoreBase;
    }else if(obj.type == "ground"){
        createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation);
    }else if(obj.type == "winWall"){
        bikegame.gameWinWall = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation, obj.type);
    }else if(obj.type == "fallWall"){
        bikegame.gameFallWall = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation, obj.type);
    }else if(obj.type == "flyOutWall"){
		bikegame.gameFlyOutWall = createGround(obj.x, obj.y, obj.width, obj.height, obj.rotation, obj.type);
	}
}

/*
 * 调整界面显示元素为游戏状态的界面
 * 无输入
 * 结果修改一些块元素的显示或者不显示
 */
function showPlayingUI() {
    $('#play').css('display','none');
    $('#replay a').css('display','block');
    $('.progressbar').css('display','block');
    $('#timer').css('display','block');
    $('#speed-text').css('display','block');
    $('#level').css('display','block');
    $('#levelResults').css('display','none');
    $('#levelPanel').css('display','none');
	$('#rule').css("display","none");
}
/*
 * 调整界面显示元素为levelResult结果状态
 * 无输入
 * 结果修改一些块元素的显示或者不显示
 */
function showLevelResultUI(){
    $('#replay a').css('display','none');
    $('.progressbar').css('display','none');
    $('#speed-text').css('display','none');
    $('#levelResults').css('display','block');
    $('#timer').css('display','none');
    $('#totalScore').text(bikegame.levelScore);
    $('#game').removeClass().addClass('gamebg_won');
}
/*
 * 调整界面显示元素为levelResult结果状态
 * 无输入
 * 结果修改一些块元素的显示或者不显示
 */
function showLevelSelectUI(){
    $('#replay a').css('display','none');
    $('.progressbar').css('display','none');
    $('#timer').css('display','none');
    $('#speed-text').css('display','none');
    $('#level').css('display','none');
    $('#levelResults').css('display','none');
    $('#levelPanel').css('display','block');
    $('#game').removeClass().addClass('gamebg_won');
}

/*
 * 调整界面为游戏结束状态
 * 无输入
 * 结果修改一些块元素的显示或者不显示
 */
function showGameOver(){
    $('#replay a').css('display','none');
    $('.progressbar').css('display','none');
    $('#speed-text').css('display','none');
    $('#levelResults').css('display','block');
    $('#timer').css('display','none');
    $('#totalScore').text(bikegame.levelScore);
    $('#game').removeClass().addClass('gamebg_won');
    $('#button').css('display','none');
}

/*
 * "规则"块动画效果
 * 执行之后规则快呈现慢慢消失的效果~
 */
function rulesAnimate(){
	$('#rule').animate({top:"36%"});
	//$('#rule').animate({top:"60%"},"fast");
	//$('#rule').animate({top:"74%"},"fast");
	$('#rule').animate({opacity: 0.2},5000,function(){$(this).css("display","none");});
}
