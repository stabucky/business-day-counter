function isBusinessDay(dateobj){
  //営業日ならばtrue
  //土曜日は非営業日。12/31から1/3までは非営業日
  if(getHoliday(dateobj) != ""){
    //休日(祝日、日曜日、振替休日)ならば非営業日false
    return false;
  }else if(dateobj.getDay() === 6){
    //土曜日ならば非営業日false
    return false;
  }else if(dateobj.getMonth()==11 && dateobj.getDate()==31){
    //12月31日ならば非営業日false
    return false;
  }else if(dateobj.getMonth()==0 && dateobj.getDate()<4){
    //1月1日から3日ならば非営業日false
    return false;
  }else{
    //上の条件に合致しない場合は営業日true
    return true;
  }
}

function getHoliday(dateobj) {
  //休日(祝日と日曜日と振替休日)を判定する関数。
  //休日ならばその名称、休日でなければ空文字を返す。
  var kyujitsu = "休日";
  var isNH = [];
  var isSun = [];
  var holidayname = [];
  var thisday, i;
  if(dateobj.getFullYear() < 2007) {
    throw new Error("2007年以上にしてください。");
  }
  for(i = -3; i < 2; i++) {
    thisday = new Date(dateobj.getFullYear(), dateobj.getMonth(), dateobj.getDate() + i);
    holidayname[i] = getNationalHoliday(thisday);
    isNH[i] = (holidayname[i] != "");
    isSun[i] = thisday.getDay() === 0 ? true : false;
  }
  //国民の祝日に関する法律第三条
  //第１項　「国民の祝日」は、休日とする。
  if(isNH[0]) {
    return holidayname[0];
  }
  //第２項　「国民の祝日」が日曜日に当たるときは、
  //その日後においてその日に最も近い「国民の祝日」でない日を
  //休日とする。
  if(isSun[-1] && isNH[-1]) {
    return kyujitsu;
  }
  if(isSun[-2] && isNH[-2] && isNH[-1]) {
    return kyujitsu;
  }
  if(isSun[-3] && isNH[-3] && isNH[-2] && isNH[-1]) {
    return kyujitsu;
  }
  //第３項　その前日及び翌日が「国民の祝日」である日は、休日とする。
  if(isNH[-1] && isNH[1]) {
    return kyujitsu;
  }
  //日曜日
  if(isSun[0]) {
    return "日曜日";
  }
  return "";
}

function getNationalHoliday(dateobj) {
  //祝日を判定する関数。
  //祝日ならばその名称、祝日でなければ空文字を返す。
  //20140808 公開。
  //20190221 修正。2019年対応(天皇の即位の日等)を反映。
  //20190221 修正。2020年対応(スポーツの日等)を反映。
  //20201229 修正。2021年対応(海の日、スポーツの日、山の日)を反映。
  var nen, tsuki, hi, yobi;
  if(dateobj.getFullYear() < 2007) {
    throw new Error("2007年以上にしてください。");
  }
  nen = dateobj.getFullYear();
  tsuki = dateobj.getMonth() + 1;
  hi = dateobj.getDate();
  yobi = dateobj.getDay();

  //2019年限定
  if( nen == 2019 && tsuki == 5 && hi == 1 ){
    return "天皇の即位の日";
  }else if(nen == 2019 && tsuki == 10 && hi== 22 ){
    return "即位礼正殿の儀の行われる日";
  //2020年限定
  }else if(nen == 2020 && tsuki == 7 && hi== 23 ){
    return "海の日";
  }else if(nen == 2020 && tsuki == 7 && hi== 24 ){
    return "スポーツの日";
  }else if(nen == 2020 && tsuki == 8 && hi== 10 ){
    return "山の日";
  //2021年限定
  }else if(nen == 2021 && tsuki == 7 && hi== 22 ){
    return "海の日";
  }else if(nen == 2021 && tsuki == 7 && hi== 23 ){
    return "スポーツの日";
  }else if(nen == 2021 && tsuki == 8 && hi== 8 ){
    return "山の日";
//一般
  }else if(tsuki == 1 && hi == 1) {
    return "元日";
  }else if(tsuki == 2 && hi == 11) {
    return "建国記念の日";
  }else if(tsuki == 4 && hi == 29) {
    return "昭和の日";
  }else if(tsuki == 5 && hi == 3) {
    return "憲法記念日";
  }else if(tsuki == 5 && hi == 4) {
    return "みどりの日";
  }else if(tsuki == 5 && hi == 5) {
    return "こどもの日";
  }else if(nen >= 2016 && nen != 2020 && nen != 2021 && tsuki == 8 && hi == 11) {
    return "山の日"; //2016年から。2020年と2021年だけ別。
  }else if(tsuki == 11 && hi == 3) {
    return "文化の日";
  }else if(tsuki == 11 && hi == 23) {
    return "勤労感謝の日";
  }else if(nen<=2018 && tsuki == 12 && hi == 23) {
    return "天皇誕生日";//2018年まで。2020年は天皇の即位の日。
  }else if(nen >= 2020 && tsuki == 2 && hi == 23) {
    return "天皇誕生日";//2020年から。
  }else if(tsuki == 1 && yobi == 1 && 7 < hi && hi < 15) {
    return "成人の日"; //1月第2月曜日。
  }else if(nen != 2020 && nen != 2021 && tsuki == 7 && yobi == 1 && 14 < hi && hi < 22) {
    return "海の日"; //7月第3月曜日。2020年と2021年だけ別。
  }else if(tsuki == 9 && yobi == 1 && 14 < hi && hi < 22) {
    return "敬老の日"; //9月第3月曜日。
  }else if(nen<=2019 && tsuki == 10 && yobi == 1 && 7 < hi && hi < 15) {
    return "体育の日"; //10月第2月曜日。2019年まで。
  }else if(nen >=2022 && tsuki == 10 && yobi == 1 && 7 < hi && hi < 15) {
    return "スポーツの日"; //10月第2月曜日。2022年から。2020年と2021年だけ別。
  }else if(tsuki == 3 && hi == shunbun(nen)) {
    return "春分の日";
  }else if(tsuki == 9 && hi == shubun(nen)) {
    return "秋分の日";
  }else{
    return "";
  }
}

function shunbun(nen) { //春分の日
  if(nen < 1900 || nen > 2099) {
    return 0;
  }
  if(nen % 4 === 0) {
    return nen <= 1956 ? 21 : (nen <= 2088 ? 20 : 19);
  } else if(nen % 4 == 1) {
    return nen <= 1989 ? 21 : 20;
  } else if(nen % 4 == 2) {
    return nen <= 2022 ? 21 : 20;
  } else {
    return nen <= 1923 ? 22 : (nen <= 2055 ? 21 : 20);
  }
}

function shubun(nen) { //秋分の日
  if(nen < 1900 || nen > 2099) {
    return 0;
  }
  if(nen % 4 === 0) {
    return nen <= 2008 ? 23 : 22;
  } else if(nen % 4 == 1) {
    return nen <= 1917 ? 24 : (nen <= 2041 ? 23 : 22);
  } else if(nen % 4 == 2) {
    return nen <= 1946 ? 24 : (nen <= 2074 ? 23 : 22);
  } else {
    return nen <= 1979 ? 24 : 23;
  }
}
