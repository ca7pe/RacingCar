/**
 * Game：跑车大冲关
 * description：采用box2d的物理引擎，制作而成的HTML5赛车过关游戏
 * 文件用途：游戏的物体创建的函数库，其中有游戏世界的创立，车子的创立，地面的创立等函数
 * made by readygo team
 * team member: 周敏如，刘日辉，李伟杰，朱玉韵，孙图彧
 * version:2.3
 *
 */

/*
 * 创建基本的box2d的模型世界
 * 主要设置一下三个值：
 * worldAABB:表示box2d空间世界的边界
 * gravity:表示box2d世界的重力大小
 * doSleep：设置box2d世界是否忽略slept object
 * 执行成功之后返回，box2d的空间世界模型
 */
function createWorld(){
    //设置世界的大小
    var worldAABB = new b2AABB();
    worldAABB.minVertex.Set(-4000,-4000);
    worldAABB.maxVertex.Set(4000,4000);

    //重力系数
    var gravity = new b2Vec2(0,300);

    var doSleep = false;

    var world = new b2World(worldAABB,gravity,doSleep);

    return world;
}

/*
 * 设置场地中不同地面的大小和位置
 * 输入参数如下：
 * X：中心位置的横坐标
 * Y：中心位置的纵坐标
 * width：地面的长度
 * height：地面的高度
 * rotation：地面的偏向角度
 * type:判断ground的类型，winWall为终点
 * 执行成功之后，则创建相应的地面，并把其加入box2d的世界中
 */
function createGround(x, y, width, height, rotation, type) {
    //产生盒形的ground
    var groundSd = new b2BoxDef();
    groundSd.extents.Set(width,height);//设置创建的box的大小
    groundSd.restitution = 0.4; //弹跳系数，最大为1
    groundSd.friction = 0.5;
    if(type == "winWall") {
        groundSd.userData = document.getElementById('flag');
    }

    var groundBd = new b2BodyDef();
    groundBd.AddShape(groundSd);
    groundBd.position.Set(x,y);//设置放置的位置
    groundBd.rotation = rotation * Math.PI / 180; //设置偏转的角度
    var body = bikegame.world.CreateBody(groundBd);

    return body;
}

/*
 *  创建车子的主体
 *  传入参数：
 *  world：要创建车子的box2d世界
 *  x：创建位置的X坐标
 *  Y：创建位置的Y坐标
 *  返回值：世界中在X，Y处创建了响应的车子主体
 */
function createBikeBody(world, x, y){
    var boxSd = new b2BoxDef();
    boxSd.density = 1.0;
    boxSd.friction = 0.5;
    boxSd.restitution = 0.4; //碰撞反弹系数，最大为1，两个不同系数的相碰时，取碰撞系数大的一个；
    boxSd.extents.Set(40, 20);
    boxSd.userData = document.getElementById('bus');
    var boxBd = new b2BodyDef();
    boxBd.AddShape(boxSd);
    boxBd.position.Set(x,y);

    return world.CreateBody(boxBd);

}

/*
 *  创建车子的轮子部分
 *  传入参数：
 *  world：要创建车子的box2d世界
 *  x：创建位置的X坐标
 *  Y：创建位置的Y坐标
 *  返回值：世界中在X，Y处创建了响应的车子的轮子
 */
function createWheel(world, x, y){
    var ballSd = new b2CircleDef();
    ballSd.density = 1.0;
    ballSd.radius = 10;
    ballSd.restitution = 0.1;
    ballSd.friction = 4.3;
    ballSd.userData = document.getElementById('wheel');
    var ballBd = new b2BodyDef();
    ballBd.AddShape(ballSd);
    ballBd.position.Set(x,y);

    return world.CreateBody(ballBd);
}

/*
 * 创建车子在x，y的位置，并且把车子的本体和轮子相结合为一个整体
 * world：要创建车子的box2d世界
 * x：创建位置的X坐标
 * Y：创建位置的Y坐标
 */
function createBikeAt(world,x,y){
    var bikeBody = createBikeBody(world,x,y);
    var bikeWheel1 = createWheel(world,x-49,y+10);
    var bikeWheel2 = createWheel(world,x+46,y+10);

    //两两捆绑
    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x-49,y+10);
    jointDef.body1 = bikeBody;
    jointDef.body2 = bikeWheel1;
    bikegame.world.CreateJoint(jointDef);

    var jointDef = new b2RevoluteJointDef();
    jointDef.anchorPoint.Set(x+46,y+10);
    jointDef.body1 = bikeBody;
    jointDef.body2 = bikeWheel2;
    bikegame.world.CreateJoint(jointDef);

    return bikeBody;
}