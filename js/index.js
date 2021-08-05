// 再次进入点餐页面。
$('.order').on('click', function () {
    $('.mt-cart').hide();
    $('.mt-bd').show();
})
// 下面是点餐，加入购物车。
var foodString = localStorage.getItem('food');
var food = JSON.parse(foodString);
$('.gogo').on('click', function () {
    var name = $(this).parent().parent().find('span').eq(0).text();
    var price = parseInt($(this).parent().parent().find('span').eq(1).text());
    // 判断是否买过
    var flag = true;
    if (food == null) {
        food = [];
    }
    for (var i = 0; i < food.length; i++) {
        if (food[i].name == $(this).parent().parent().find('span').eq(0).text()) {
            food[i].number++;
            flag = false;
            break;
        }
    }
    if (flag) {
        food.push({ name: $(this).parent().parent().find('span').eq(0).text(), price: parseInt($(this).parent().parent().find('span').eq(1).text()), number: 1 });
    }
    localStorage.setItem('food', JSON.stringify(food));
    shopNumber();
})
shopNumber();
// 进入购物车
$('.mt-nav').on('click', function () {
  if(food == null){
      food =[];
    }
      $('tbody').children().remove();
      for(var i =0;i<food.length;i++){
          var tr = $(' <tr><td><input type="checkbox" class="selec"></td><td>' + food[i].name + '</td><td>' + food[i].price + '</td><td>' + food[i].number + '</td><td><input type="button" value="删除" class="del"></td></tr>')
          $('#cartTbody').append(tr);
      }
      $(':checkbox').prop('checked', false);
      $('.mt-cart').show();
      $('.mt-bd').hide();
      allMoney();
})
// 以下是删除的
$('tbody').on('click', '.del', function () {
            food.splice(this,1);
    $(this).parent().parent().remove();
    // 把不是选中的删除之后，如果剩下的都是选中。则全选按钮选中。总金额变化，以及购物车数量变化。
    $(':checkbox:first').prop('checked', !($(':checkbox:gt(0):not(:checked)').length) > 0);
    allMoney();
    shopNumber();
    localStorage.setItem('food', JSON.stringify(food));
})
// 购物车数量函数
function shopNumber() {
    if(food == null){
        food =[]
    }
        var number = food.length;
        $('#num').text(number);
    
}
// 全选
$('#checkedAll').on('change', function () {
    $('.selec').prop('checked', $(this).prop('checked'));
    allMoney();
})
// 单选与全选
$('table').on('change', ':checkbox:gt(0)', function () {
    $(':checkbox:first').prop('checked', !($(':checkbox:gt(0):not(:checked)').length) > 0);
    allMoney();
})
// 总金额
function allMoney() {
    var a = 0;
    for (var i = 0; i < $('tbody').children().length; i++) {
        if ($('tbody').children().eq(i).children().eq(0).children().eq(0).prop('checked')) {
            a += Number($('tbody').children().eq(i).children().eq(2).text()) * Number($('tbody').children().eq(i).children().eq(3).text());
        }
    }
    $('#money').text(a);
}
// 结算
$('#jiesuan').on('click', function () {
    var c= $('.selec:checked').toArray();
    for(var i = c.length-1;i>=0;i--){
        var nam = $(c[i]).parent().next().text();
        for(var j =food.length-1;j>=0;j--){
            if(nam == food[j].name){
                food.splice(j,1);
            }

        }
    }
    $('tbody :checkbox:checked').parent().parent().remove();
    shopNumber();
    allMoney();
    localStorage.setItem('food', JSON.stringify(food));
    alert('付款成功');
})
// 删除选中
$('#delet').on('click', function () {
    var c= $('.selec:checked').toArray();
    for(var i = c.length-1;i>=0;i--){
        var nam = $(c[i]).parent().next().text();
        for(var j =food.length-1;j>=0;j--){
            if(nam == food[j].name){
                food.splice(j,1);
            }   
        }
    }
    $('tbody :checkbox:checked').parent().parent().remove();
    shopNumber();
    allMoney();
    localStorage.setItem('food', JSON.stringify(food));
})