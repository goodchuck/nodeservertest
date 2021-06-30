window.onload = function () {
  drawMap("#container");
};

const changeObject = {
  화성시: ["DEVICE00000000157", "DEVICE00000000158"],
  의정부시: ["DEVICE00000000159", "DEVICE00000000160"],
  홍천군: ["DEVICE00000000161", "DEVICE00000000162"],
  강릉시: ["DEVICE00000000163", "DEVICE00000000164"],
  정선군: ["DEVICE00000000165", "DEVICE00000000166"],
  논산시: ["DEVICE00000000167", "DEVICE00000000168"],
  충주시: ["DEVICE00000000169", "DEVICE00000000170"],
  보은군: ["DEVICE00000000171", "DEVICE00000000172"],
  예산군: ["DEVICE00000000173", "DEVICE00000000174"],
  광산구: ["DEVICE00000000175", "DEVICE00000000176"],
  남원시: ["DEVICE00000000177", "DEVICE00000000178"],
  순천시: ["DEVICE00000000179", "DEVICE00000000180"],
  전주시완산구: ["DEVICE00000000181", "DEVICE00000000182"],
  진주시: ["DEVICE00000000183", "DEVICE00000000184"],
  포항시남구: ["DEVICE00000000185", "DEVICE00000000186"],
  영주시: ["DEVICE00000000187", "DEVICE00000000188"],
  김해시: ["DEVICE00000000189", "DEVICE00000000190"],
  달성군: ["DEVICE00000000191", "DEVICE00000000192"]
};
const convert = {
  수원: ["DEVICE00000000157", "DEVICE00000000158"],
  의정부: ["DEVICE00000000159", "DEVICE00000000160"],
  홍천: ["DEVICE00000000161", "DEVICE00000000162"],
  강릉: ["DEVICE00000000163", "DEVICE00000000164"],
  정선: ["DEVICE00000000165", "DEVICE00000000166"],
  논산: ["DEVICE00000000167", "DEVICE00000000168"],
  충주: ["DEVICE00000000169", "DEVICE00000000170"],
  보은: ["DEVICE00000000171", "DEVICE00000000172"],
  예산: ["DEVICE00000000173", "DEVICE00000000174"],
  광주: ["DEVICE00000000175", "DEVICE00000000176"],
  남원: ["DEVICE00000000177", "DEVICE00000000178"],
  순천: ["DEVICE00000000179", "DEVICE00000000180"],
  전주: ["DEVICE00000000181", "DEVICE00000000182"],
  진주: ["DEVICE00000000183", "DEVICE00000000184"],
  포항: ["DEVICE00000000185", "DEVICE00000000186"],
  영주: ["DEVICE00000000187", "DEVICE00000000188"],
  진영: ["DEVICE00000000189", "DEVICE00000000190"],
  대구: ["DEVICE00000000191", "DEVICE00000000192"]
};
const name2name = {
  화성시: "수원",
  의정부시: "의정부",
  홍천군: "홍천",
  강릉시: "강릉",
  정선군: "정선",
  논산시: "논산",
  충주시: "충주",
  보은군: "보은",
  예산군: "예산",
  광산구: "광주",
  남원시: "남원",
  순천시: "순천",
  전주시완산구: "전주",
  진주시: "진주",
  포항시남구: "포항",
  영주시: "영주",
  김해시: "진영",
  달성군: "대구"
};

//지도 그리기
function drawMap(target) {
  var width = 500; //지도의 넓이
  var height = 575; //지도의 높이
  var initialScale = 5600; //확대시킬 값
  var initialX = -12250; //초기 위치값 X
  var initialY = 4100; //초기 위치값 Y
  var labels;

  var projection = d3.geo
    .mercator()
    .scale(initialScale)
    .translate([initialX, initialY]);
  var path = d3.geo.path().projection(projection);
  var zoom = d3.behavior
    .zoom()
    .translate(projection.translate())
    .scale(projection.scale())
    .scaleExtent([height, 800 * height])
    .on("zoom", zoom);

  var svg = d3
    .select(target)
    .append("svg")
    .attr("width", width + "px")
    .attr("height", height + "px")
    .attr("id", "map")
    .attr("class", "map")
    .style("color", "yellow");
  //   .attr('style','background-color:red')

  var states = svg.append("g").attr("id", "states").call(zoom);

  states
    .append("rect")
    .attr("class", "background")
    .attr("width", width + "px")
    .attr("height", height + "px")
    //   .style('background-color','red')
    .attr("fill", "white");

  //geoJson데이터를 파싱하여 지도그리기
  const cityArray = [
    "화성시",
    "의정부시",
    "홍천군",
    "강릉시",
    "정선군",
    "충주시",
    "보은군",
    "논산시",
    "예산군",
    "전주시완산구",
    "남원시",
    "광산구",
    "순천시",
    "달성군",
    "포항시남구",
    "영주시",
    "진주시",
    "김해시"
  ];

  d3.json("json/korea4.json", function (json) {
    states
      .selectAll("path") //지역 설정
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", (e) => {
        if (cityArray.includes(e.properties.SIG_KOR_NM)) {
          return "target";
        } else {
          return "nonTarget";
        }
      })
      .attr("id", function (d) {
        return "path-" + d.properties.SIG_KOR_NM;
      })
      .on("click", (e) => {
        console.log(e);
        if (cityArray.includes(e.properties.SIG_KOR_NM)) {

          states.select(".activeTarget").attr("class", "target");

          states
            .select("#path-" + e.properties.SIG_KOR_NM)
            .attr("class", "activeTarget");

          document.getElementById("GraphWrap1Title").innerText =
          name2name[e.properties.SIG_KOR_NM] + " 국토관리사무소 당일 포트홀 현황";
          document.getElementById("GraphWrap2Title").innerText = name2name[e.properties.SIG_KOR_NM] + " 국토관리사무소 월별 포트홀 검수량 비교"
          // document.getElementById("GraphWrap2Title").innerText=e.properties.SIG_KOR_NM+" 월별 포트홀 검수 현황"
          // document.getElementById("GraphWrap3Title").innerText=e.properties.SIG_KOR_NM +" 월별 포트홀 검수 현황 순위"
          document.getElementById("sleceted").innerText =
          name2name[e.properties.SIG_KOR_NM] +" 국토관리사무소";


          var today = new Date();   
          var tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          var settings_statis_showImagesByDate = {
            url:
              "http://165.246.196.154:25020/app/statis/deviceCompare?date_from=" +
              today.toISOString().slice(0, 10) +
              "&date_to=" +
              tomorrow.toISOString().slice(0, 10),
        
            method: "GET"
          };

          $.ajax(settings_statis_showImagesByDate).done((response) => {


            console.log(changeObject[e.properties.SIG_KOR_NM]);
            const device1test =
              response.HUMAN_CNT[changeObject[e.properties.SIG_KOR_NM][0]];
            const device2test =
              response.HUMAN_CNT[changeObject[e.properties.SIG_KOR_NM][1]];
            const device1result =
              response.PTH_CNT[changeObject[e.properties.SIG_KOR_NM][1]];
            const device2result =
              response.PTH_CNT[changeObject[e.properties.SIG_KOR_NM][1]];
            console.log(device1test, device2test, device1result, device1result);
            document.getElementById(
              "GraphWrap1testNum-1"
            ).innerText = device1test ? device1test : 0;
            document.getElementById(
              "GraphWrap1testNum-2"
            ).innerText = device2test ? device2test : 0;
            document.getElementById(
              "GraphWrap1resultNum-1"
            ).innerText = device1result ? device1result : 0;
            document.getElementById(
              "GraphWrap1resultNum-2"
            ).innerText = device2result ? device2result : 0;
            document.getElementById("GraphWrap1TestSum").innerText =
              device1test + device2test ? device1test + device2test : 0;
            document.getElementById("GraphWrap1ResultSum").innerText =
              device1result + device2result ? device1result + device2result : 0;
          });
           document.getElementById("monthDeviceUsed").innerText = name2name[e.properties.SIG_KOR_NM] + " 국토관리사무소 월별 포트홀 기기 사용 현황"

          const cardSetting = {
            url:
              "http://165.246.196.154:25020/app/statis/mainsection?secondDeviceId=" +
              changeObject[e.properties.SIG_KOR_NM][0] +
              "&firstDeviceId=" +
              changeObject[e.properties.SIG_KOR_NM][1],
            method: "GET"
          };
          
          $.ajax(cardSetting).done((response) => {
            console.log("HERE!");
            console.log(response);
            document.getElementById("monthpatroll").innerText = Math.round(
              response.patrolAllCnt / 2 ///3/25일 부터 달 수 
            );
            document.getElementById("allpatroll").innerText =
              response.patrolAllCnt;
            document.getElementById("monthtest").innerText = Math.round(
              response.inspectAllCnt / 2
            );
            document.getElementById("alltest").innerText =
              response.inspectAllCnt;
            document.getElementById("monthresult").innerText = Math.round(
              response.detectAllCnt / 2
            );
            document.getElementById("allresult").innerText =
              response.detectAllCnt;
            document.getElementById("monthdata").innerText = Math.round(
              response.recvAllCnt / 2
            );
            document.getElementById("alldata").innerText = response.recvAllCnt;
          });

          $.ajax(settings_statis_showImagesByDate).done((response) => {

            const selected = name2name[e.properties.SIG_KOR_NM];
            // respons.PTH_CNT((v)=>{r})
            const dataArray = [
              ["수원", 1000, 400],
              ["의정부", 1000, 400],
              ["홍천", 1000, 400],
              ["강릉", 1000, 400],
              ["정선", 1000, 400],
              ["충주", 1000, 400],
              ["보은", 1000, 400],
              ["논산", 1000, 400],
              ["예산", 1000, 400],
              ["전주", 1000, 400],
              ["남원", 1000, 400],
              ["광주", 1000, 400],
              ["순천", 1000, 400],
              ["대구", 1000, 400],
              ["포항", 1000, 400],
              ["영주", 1000, 400],
              ["진주", 1000, 400],
              ["진영", 1000, 400]
            ];

            var temp = [
              [
                "지역",
                "기기1",
                { role: "annotation" },
                { role: "style" },
                "기기2",
                { role: "annotation" },
                { role: "style" }
              ]
            ];
            for (var i = 0; i < dataArray.length; i++) {
              console.log(i);
              // alert(i)
              if (selected !== dataArray[i][0]) {
                temp.push([
                  dataArray[i][0],
                  response.DATA_CNT[convert[dataArray[i][0]][0]],
                  response.DATA_CNT[convert[dataArray[i][0]][0]],
                  "blue",
                  response.DATA_CNT[convert[dataArray[i][0]][1]],
                  response.DATA_CNT[convert[dataArray[i][0]][1]],
                  "red"
                ]);
              } else {
                temp.push([
                  dataArray[i][0],
                  response.DATA_CNT[convert[dataArray[i][0]][0]],
                  response.DATA_CNT[convert[dataArray[i][0]][0]],
                  "green",
                  response.DATA_CNT[convert[dataArray[i][0]][1]],
                  response.DATA_CNT[convert[dataArray[i][0]][1]],
                  "green"
                ]);
              }
              // temp.push([dataArray[i][0],Object.values(response.HUMAN_CNT[i*2][0])[0],Object.values(response.HUMAN_CNT[i*2+1][0])[0]])
              //    dataArray[i]=[dataArray[i][0],Object.values(response.HUMAN_CNT[i*2][0])[0],Object.values(response.HUMAN_CNT[i*2+1][0])[0]]
              // dataArray[i] = [dataArray[i][0],Object.values(response.PTH_CNT[i*2][0])[0],Object.values(response.PTH_CNT[i*2+1][0])[0]]
            }
            console.log(temp);
            var data = google.visualization.arrayToDataTable(temp);
            var options = {
              chart: {
                // title: 'Company Performance',
                // subtitle: 'Sales, Expenses, and Profit: 2014-2017',
              },
              width: 600,
              height: 205,
              legend: { position: "none" },
              chartArea: { width: "90%", height: "80%",left: 30 },
              vAxis: {
                viewWindow: {
                  // max:100,
                  min: 0
                },
                 textPosition: 'none' 
              },
              hAxis : { 
                textStyle : {
                fontSize: 6 ,// or the number you want
                maxAlternation: 1
                }
              },
    
            };

            var chart1 = new google.visualization.ColumnChart(
              document.getElementById("Today_use")
            );
            chart1.draw(data, options);
          });
         
          var response1;

          $.ajax({
            url:
              "http://165.246.196.154:25020/app/statis/inspectAllByMonth?deviceId=" +
              changeObject[e.properties.SIG_KOR_NM][0],
            method: "get"
          }).done((response) => {
            console.log("http://165.246.196.154:25020/app/statis/inspectAllByMonth?deviceId=" +
            changeObject[e.properties.SIG_KOR_NM][0])
            response1 = response.inspectAllByMonth;
          });

          $.ajax({
            url:
              "http://165.246.196.154:25020/app/statis/inspectAllByMonth?deviceId=" +
              changeObject[e.properties.SIG_KOR_NM][1],
            method: "get"
          }).done((response2) => {
            console.log("http://165.246.196.154:25020/app/statis/inspectAllByMonth?deviceId=" +
            changeObject[e.properties.SIG_KOR_NM][1])
            document.getElementById("contentHeadFind").innerText = name2name[e.properties.SIG_KOR_NM]+ " 국토관리사무소 월별 포트홀 검수 그래프"
            var temp = [
              ["1월", 0, 0],
              ["2월", 0, 0],
              ["3월", 0, 0],
              ["4월", 0, 0],
              ["5월", 0, 0],
              ["6월", 0, 0],
              ["7월", 0, 0],
              ["8월", 0, 0],
              ["9월", 0, 0],
              ["10월", 0, 0],
              ["11월", 0, 0],
              ["12월", 0, 0]
            ];
            console.log("_++++++++++++++++++++++++++_")
            console.log(response2,response1)
            console.log(changeObject[e.properties.SIG_KOR_NM])
            for (var elem of response2.inspectAllByMonth) {
              temp[elem.MONTH - 1] = [
                temp[elem.MONTH - 1][0],
                temp[elem.MONTH - 1][1] + elem.COUNT,
                temp[elem.MONTH - 1][2] + elem.COUNT
              ];
            }
            for (var elem of response1) {
              temp[elem.MONTH - 1] = [
                temp[elem.MONTH - 1][0],
                temp[elem.MONTH - 1][1] + elem.COUNT,
                temp[elem.MONTH - 1][2] + elem.COUNT
              ];
            }

            var data = new google.visualization.DataTable();
            data.addColumn("string", "달");
            data.addColumn("number", "사용현황");
            data.addColumn({ type: "number", role: "annotation" });
            console.log(temp);
            data.addRows(temp);
            var options = {
              hAxis: {},
              vAxis: {
                textPosition: "none"
              },
              backgroundColor: "white",
              // curveType: 'function',
              height: 300,
              width: 1020,
              chartArea: { width: "95%", left: 30 },
              pointSize: 6,
              legend: { position: "none" }
            };
            var regionMonthFindChart = new google.visualization.LineChart(
              document.getElementById("regionMonthFindChart")
            );
            regionMonthFindChart.draw(data, options);
          });
          var monthResponse1;
          $.ajax({
            method: "get",
            url: "http://165.246.196.154:25020/app/statis/potholeallbymonth?deviceId="+changeObject[e.properties.SIG_KOR_NM][0]
          }).done((response) => {
            console.log("http://165.246.196.154:25020/app/statis/potholeallbymonth?deviceId="+changeObject[e.properties.SIG_KOR_NM][0])
            monthResponse1=response
            console.log("+_+_+_+_+_+")
            console.log(monthResponse1)
          })
          $.ajax({
            method: "get",
            url: "http://165.246.196.154:25020/app/statis/potholeallbymonth?deviceId="+changeObject[e.properties.SIG_KOR_NM][1]
          }).done((response) => {
            document.getElementById("monthResultRegion").textContent = " "+name2name[e,e.properties.SIG_KOR_NM]+" 국토관리사무소 월별 포트홀 검출 그래프"
            var monthData = new google.visualization.DataTable();
            monthData.addColumn('string', '달');
            monthData.addColumn('number', '포트홀');
            monthData.addColumn({type: 'number', role: 'annotation'})
            var temp = [
                      ["1월", 0, 0],
                      ["2월", 0, 0],
                      ["3월", 0, 0],
                      ["4월", 0, 0],
                      ["5월", 0, 0],
                      ["6월", 0, 0],
                      ["7월", 0, 0],
                      ["8월", 0, 0],
                      ["9월", 0, 0],
                      ["10월", 0, 0],
                      ["11월", 0, 0],
                      ["12월", 0, 0]
                    ];
                    for (var elem of response.inspectAllByMonth) {
                      temp[elem.MONTH - 1] = [
                        temp[elem.MONTH - 1][0],
                        elem.COUNT,
                        elem.COUNT
                      ];
                    }
                    for(var elem of monthResponse1.inspectAllByMonth) {
                      temp[elem.MONTH - 1] = [
                        temp[elem.MONTH - 1][0],
                        temp[elem.MONTH - 1][1]+elem.COUNT,
                        temp[elem.MONTH - 1][2]+elem.COUNT
                      ];
                    }
    
            monthData.addRows(
              temp
            );
    
            var options = {
              hAxis: {
              },
              vAxis: {
                textPosition:"none"
    
              },
              backgroundColor: 'white',
              // curveType: 'function',
              height: 300,
              width: 1020,
              chartArea: { width: "95%",left: 30,},
              pointSize: 6,
              legend: { position: "none" },
            };
    
            var chart = new google.visualization.LineChart(document.getElementById('monthChart'));
            chart.draw(monthData, options);
          })

          /////// CHANGE API URL
          var useResponse1;
          $.ajax({
            url : "http://165.246.196.154:25020/app/statis/inspectAllByMonth?deviceId=" +
            changeObject[e.properties.SIG_KOR_NM][0],
            method: "get"
          }).done((response) =>{
            useResponse1 = response.inspectAllByMonth
          })


          $.ajax({
            url : "http://165.246.196.154:25020/app/statis/inspectAllByMonth?deviceId=" +
            changeObject[e.properties.SIG_KOR_NM][1],
            method: "get"
          }).done((useResponse2) => {
            var temp = [["1월", 0,0], ["2월", 0, 0], ["3월", 0, 0], ["4월", 0, 0], ["5월", 0, 0], ["6월", 0, 0], ["7월", 0, 0], ["8월", 0, 0], ["9월", 0, 0], ["10월", 0, 0], ["11월", 0, 0], ["12월", 0, 0]];
            for (var elem of useResponse2.inspectAllByMonth) {
              temp[elem.MONTH - 1] = [temp[elem.MONTH - 1][0], elem.COUNT,elem.COUNT];
            }            
            for (var elem of useResponse1) {
              temp[elem.MONTH - 1] = [temp[elem.MONTH - 1][0],temp[elem.MONTH - 1][1]+ elem.COUNT,temp[elem.MONTH - 1][2]+elem.COUNT];
            }
            var data = new google.visualization.DataTable();
            data.addColumn("string", "달");
            data.addColumn("number", "사용현황");
            data.addColumn({type: 'number', role: 'annotation'})
            console.log(temp)
            data.addRows(temp);
            var chart = new google.visualization.ColumnChart(
              document.getElementById("monthRegionGraph")
            );
            var barOptions = {
              //   title: "Population of Largest U.S. Cities",
              hAxis: {
                minValue: 0,
              },
              vAxis: {
                textPosition :"none"
               
              },
              width: 600,
              height: 200,
              title: { position: "none" },
              chartArea: { width: "90%", top: 20, height: "80%" },
              legend: {position: "none"},
              bar: { groupWidth: "50%" }
            };
            chart.draw(data, barOptions);
            const sortedTemp = temp.sort((a, b) => { return b[1] - a[1] })
            for (var i = 0; i< 5; i++){
              document.getElementById("monthTableCell-"+(i + 1)).innerText = sortedTemp[i][0]
              document.getElementById("monthTableCellValue-"+(i + 1)).innerText = sortedTemp[i][1]
    
            }
          });
          // return "target"
        } else {
          // return "nonTarget"
        }
      });

    states
      .append("text")
      .text("의정부")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "150px")
      .attr("y", "110px");
    states
      .append("text")
      .text("강릉")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "340px")
      .attr("y", "120px");
    states
      .append("text")
      .text("홍천")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "250px")
      .attr("y", "90px");
    states
      .append("text")
      .text("충주")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "240px")
      .attr("y", "200px");
    states
      .append("text")
      .text("정선")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "320px")
      .attr("y", "150px");
    states
      .append("text")
      .text("예산")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "130px")
      .attr("y", "250px");
    states
      .append("text")
      .text("영주")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "300px")
      .attr("y", "220px");

    states
      .append("text")
      .text("광주")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "120px")
      .attr("y", "420px");
    states
      .append("text")
      .text("수원")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "120px")
      .attr("y", "180px");
    states
      .append("text")
      .text("순천")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "180px")
      .attr("y", "450px");

    states
      .append("text")
      .text("남원")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "180px")
      .attr("y", "400px");

    states
      .append("text")
      .text("논산")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "160px")
      .attr("y", "300px");

    states
      .append("text")
      .text("대구")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "300px")
      .attr("y", "350px");

    states
      .append("text")
      .text("전주")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "160px")
      .attr("y", "330px");

    states
      .append("text")
      .text("진주")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "260px")
      .attr("y", "400px");
    states
      .append("text")
      .text("진영")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "320px")
      .attr("y", "400px");

    states
      .append("text")
      .text("보은")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "210px")
      .attr("y", "260px");
    states
      .append("text")
      .text("포항")
      .attr("width", "100px")
      .attr("height", "100px")
      .attr("x", "410px")
      .attr("y", "320px");
  });

  function zoom() {
    projection.translate(d3.event.translate).scale(d3.event.scale);
    // states.selectAll("path").attr("d", path);
    // states.selectAll("text")
    //   labels.attr('transform', translateTolabel);
  }
}
