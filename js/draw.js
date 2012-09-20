/**
 * Game：跑车大冲关
 * description：采用box2d的物理引擎，制作而成的HTML5赛车过关游戏
 * 文件用途：绘制游戏的物体为可见的物体，drawshape为游戏基本模型的绘制函数，
 * 			 drawWorld函数则为image物体的绘制实现~
 * made by readygo team
 * team member: 周敏如，刘日辉，李伟杰，朱玉韵，孙图彧
 * version:2.3
 *
 */
 
/*
 *  绘制图形的函数
 *  传入的参数如下：
 *  world：绘制的box2d世界
 *  context：box2d中的含有的部件
 *  返回值：创建box2d可视化世界
 */
function drawWorld(world, context) {
    for (var b = world.m_bodyList; b != null; b = b.m_next) {
        for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
            if (s.GetUserData() != undefined)
            {
                // the user data contains the reference to the image
                var img = s.GetUserData();

                // the x and y of the image. We have to substract the half width/height
                var x = s.GetPosition().x;
                var y = s.GetPosition().y;
                var topleftX = - $(img).width()/2;
                var topleftY = - $(img).height()/2;

                context.save();
                context.translate(x,y);
                context.rotate(s.GetBody().GetRotation());
                context.drawImage(img, topleftX, topleftY);
                context.restore();
            }
			//else {
             //   drawShape(s, context);
            //}
        }
    }
}

// drawShape function directly copy from draw_world.js in Box2dJS library
//绘制图形的具体实现的部分，现在会绘制几何图形，之后确定界面风格之后，在修改成绘制图片成像
function drawShape(shape, context) {
    context.strokeStyle = '#003300';
    context.beginPath();
    switch (shape.m_type) {
        case b2Shape.e_circleShape:
            var circle = shape;
            var pos = circle.m_position;
            var r = circle.m_radius;
            var segments = 16.0;
            var theta = 0.0;
            var dtheta = 2.0 * Math.PI / segments;
            // draw circle
            context.moveTo(pos.x + r, pos.y);
            for (var i = 0; i < segments; i++) {
                var d = new b2Vec2(r * Math.cos(theta), r * Math.sin(theta));
                var v = b2Math.AddVV(pos, d);
                context.lineTo(v.x, v.y);
                theta += dtheta;
            }
            context.lineTo(pos.x + r, pos.y);

            // draw radius
            context.moveTo(pos.x, pos.y);
            var ax = circle.m_R.col1;
            var pos2 = new b2Vec2(pos.x + r * ax.x, pos.y + r * ax.y);
            context.lineTo(pos2.x, pos2.y);
            break;
        case b2Shape.e_polyShape:
            var poly = shape;
            var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
            context.moveTo(tV.x, tV.y);
            for (var i = 0; i < poly.m_vertexCount; i++) {
                var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
                context.lineTo(v.x, v.y);
            }
            context.lineTo(tV.x, tV.y);
            break;
    }
    context.stroke();
}