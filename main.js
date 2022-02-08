
function personal_tax(p_tax_after){

// 1	不超过36000元的部分	3%	0
// 2	超过36000元至144000元的部分	10%	2520
// 3	超过144000元至300000元的部分	20%	16920
// 4	超过300000元至420000元的部分	25%	31920
// 5	超过420000元至660000元的部分	30%	52920
// 6	超过660000元至960000元的部分	35%	85920
// 7	超过960000元的部分	45%	181920

    const p_tax_0_36000 = 0
    const p_tax_36000_144000 = 2520
    const p_tax_144000_300000 = 16920
    const p_tax_300000_420000 = 31920
    const p_tax_420000_660000 = 52920
    const p_tax_660000_960000 = 85920
    const p_tax_960000_ = 181920
    const p_tax_free = 60000
    var p_tax_total = p_tax_after - p_tax_free;
    var p_tax_result = 0;
    if( p_tax_total <= 0 ){
        return p_tax_result;
    }
    if( p_tax_total > 960000 ){
        p_tax_result =  p_tax_total*0.45 - p_tax_960000_;
    }else if( p_tax_total > 660000 ){
        p_tax_result =  p_tax_total*0.35 - p_tax_660000_960000;
    }else if(p_tax_total > 420000 ){
        p_tax_result =  p_tax_total*0.3 - p_tax_420000_660000;
    }else if(p_tax_total > 300000 ){
        p_tax_result =  p_tax_total*0.25 - p_tax_300000_420000;
    }else if(p_tax_total > 144000 ){
        p_tax_result =  p_tax_total*0.2 - p_tax_144000_300000;
    }else if(p_tax_total > 36000 ){
        p_tax_result =  p_tax_total*0.1 - p_tax_36000_144000;
    }else{
        p_tax_result =  p_tax_total*0.03 - p_tax_0_36000;
    }
    return p_tax_result;
}

function bonus_tax(b_tax){
// 1	未超过3000元的部分	3%	0
// 2	超过3000元至12,000元的部分	10%	210
// 3	超过12,000元至25,000元的部分	20%	1410
// 4	超过25,000元至35,000元的部分	25%	2660
// 5	超过35,000元至55,000元的部分	30%	4410
// 6	超过55,000元至80,000元的部分	35%	7160
// 7	超过80,000元的部分	45%	15160
    const p_tax_0_3000 = 0
    const p_tax_3000_12000 = 210
    const p_tax_12000_25000 = 1410
    const p_tax_25000_35000 = 2660
    const p_tax_35000_55000 = 4410
    const p_tax_55000_80000 = 7160
    const p_tax_80000_ = 15160
    var p_tax_result = 0;
    var b_tax_moth = b_tax/12;
    if( b_tax_moth > 80000 ){
        p_tax_result = b_tax*0.45 - p_tax_80000_;
    }else if(b_tax_moth > 55000 ){
        p_tax_result = b_tax*0.35 - p_tax_55000_80000;
    }else if(b_tax_moth > 35000 ){
        p_tax_result = b_tax*0.3 - p_tax_35000_55000;
    }else if(b_tax_moth > 25000 ){
        p_tax_result = b_tax*0.25 - p_tax_25000_35000;
    }else if(b_tax_moth > 12000 ){
        p_tax_result = b_tax*0.20 - p_tax_12000_25000;
    }else if(b_tax_moth > 3000 ){
        p_tax_result = b_tax*0.10 - p_tax_3000_12000;
    }else{
        p_tax_result = b_tax*0.03 - p_tax_0_3000;
    }
    return p_tax_result;
}



      // Initialize the echarts instance based on the prepared dom
var myChart = echarts.init(document.getElementById('main'));

var option = {
    title: {
        text: '年终奖还是分月发',
        subtext: 'x轴表示年终奖的数量'
    },
    tooltip: {},
    legend: {
    },
    xAxis: {
        data: []
    },
    yAxis: {},
    series: [
        {
            name: '税费',
            type: 'bar',
            stack: 'total',
            data: []
        }
    ]
};

var p_earn_after_per_moth_dom = document.getElementById('p_earn_after_per_moth');
var p_zhuanxiang_dom = document.getElementById('p_zhuanxiang');

function loadData(){
    var p_earn_after_per_moth =  p_earn_after_per_moth_dom.value;
    var p_zhuanxiang =  p_zhuanxiang_dom.value;
    option.xAxis.data = [];
    option.series[0].data = [];
    var p_tax_per_year = (p_earn_after_per_moth-p_zhuanxiang) * 12;
    for( var x = 0;x<=p_tax_per_year; ){
        option.xAxis.data.push(x);
        var p_tax_per_year_left = p_tax_per_year - x;
        var a = personal_tax(p_tax_per_year_left)
        var b = bonus_tax(x)
        option.series[0].data.push((a+b).toFixed());
        console.log(x,a,b);
        x += 1000;
    }
    myChart.setOption(option);
}

loadData();