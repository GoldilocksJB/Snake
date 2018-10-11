function moving (direction, snake, apple) 
{
	var eaten = false,
        gameover = false,
        prev = snake[0],
        current  = {'x': snake[0].x + direction.x, 'y': snake[0].y + direction.y};

        //возврат в пределы экрана, если вышли за границу
	if (current.x === 20) current.x =  0;
    if (current.x === -1) current.x = 19;
	if (current.y === 20) current.y =  0;
    if (current.y === -1) current.y =  19;
    
     //текущее положение головы змеи
    snake[0] = current;
    
    if (snake[0].x === apple.x && snake[0].y === apple.y) eaten = true;
    
    //если голова столкнулась с элементом хвоста - гейм овер
	for (var i = 1, len = snake.length; i < len; i++)
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) gameover = true;
    
    //координаты головы становятся координатами следующего элемента тела
    for (var i = 1, len = snake.length; i < len; i++) 
    {
		current	= snake[i];
		snake[i] = prev;
        prev = current; 
        
    }
       
    // если яблоко съели, то добавляем жлемент к змее и генерим новое яблоко
    if (eaten) 
    {
        snake.push(current);
        apple.x = Math.floor(Math.random() * 20);
        apple.y = Math.floor(Math.random() * 20); 
        score++;
    }
    
    if (gameover) 
    {
		alert('GAME OVER! Your score: ' + score);
        location.reload(); 
    }
};

function draw (context, snake, apple) 
{
    for (var i = 0, len = snake.length; i < len; i++) 
    {
        //закрашиваем голову и тело змеи
        context.fillStyle = (i === 0) ? '#C71585' : '#FF69B4';
        context.fillRect(snake[i].x * 20, snake[i].y * 20, 20 - 1, 20 - 1); 
    }

    //закрашиваем яблоко
	context.fillStyle = '#8B0000';
    context.fillRect(apple.x * 20, apple.y * 20, 20 - 1, 20 - 1);
    
};

function core () 
{
    var canvas = document.getElementById('snake'),
        context = canvas.getContext('2d'),
		snake = [{'x': 5, 'y': 3}, {'x': 4, 'y': 3}, {'x': 3, 'y': 3}], //начальное положение змеи
		direction = {'x': 1, 'y': 0}, //начальное направление
        apple = {'x': Math.floor(Math.random() * 20), 'y': Math.floor(Math.random() * 20)}; //первый раз генерим яблоко
        score=0;
    canvas.width  = 400; canvas.height = 400;

    var speed = prompt('Choose speed:','5');
    alert('Press to start');
    
    
    setInterval(function () 
        {
		context.clearRect(0, 0, canvas.width, canvas.height);
        moving(direction, snake, apple);
        draw(context, snake, apple);
        context.fillStyle = '#000', context.fillText('Your score: '+score, 5, 10);
        }, 1000 / speed);
        

        //поворот змеи + проверка на противоположное направление
    document.onkeydown = function (event) 
    {
        switch(event.keyCode)
        {
            case 37:
            (direction.x !==  1) ? direction = {'x': -1, 'y': 0} :'';
            break;

            case 38:
            (direction.y !==  1) ? direction = {'x': 0, 'y': -1} :'';
            break;

            case 39:
            (direction.x !== -1) ? direction = {'x': 1, 'y': 0} :'';
            break;

            case 40:
            (direction.y !== -1) ? direction = {'x': 0, 'y': 1} :'';
            break;
        }

	};
}
core();