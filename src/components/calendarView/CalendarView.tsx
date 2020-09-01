import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { Entypo, AntDesign } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    marginVertical: 55,
    padding: 25,
  },
  currentMonth: {
    fontSize: 26,
    color: 'black',
  },
  currentYear: {
    fontSize: 26,
    color: 'black',
    marginLeft: 10,
  },
});

interface DayListData {
  fullDateStr: string;
  isoWeekDay: number;
}

interface Mood {
  good: string;
  okay: string;
  bad: string;
}

const mood: Mood = {
  good: '#99cc99',
  okay: '#e5e500',
  bad: '#ff6666',
};

function CalendarView(props: any): JSX.Element {
  const [today, setToday] = useState('');
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
  const [yearStr, setYearStr] = useState('');
  const [monthStr, setMonthStr] = useState('');

  const [weekDays, setWeekDays] = useState<string[]>([]);

  const [mondayList, setMondayList] = useState<DayListData[]>([]);
  const [tuesdayList, setTuesdayList] = useState<DayListData[]>([]);
  const [wednesdayList, setWednesdayList] = useState<DayListData[]>([]);
  const [thursdayList, setThursdayList] = useState<DayListData[]>([]);
  const [fridayList, setFridayList] = useState<DayListData[]>([]);
  const [saturdayList, setSaturdayList] = useState<DayListData[]>([]);
  const [sundayList, setSundayList] = useState<DayListData[]>([]);

  const [addEmptyBox, setAddEmptyBox] = useState(false);

  useEffect(() => {
    getToday();
    getCurrentMonth();
    getCurrentYear();
    getYearStr();
    getMonthStr();

    getWeekDays();
  }, []);

  useEffect(() => {
    if (yearStr && monthStr) {
      getAvailableDaysInMonth(yearStr, monthStr);
    }
  }, [yearStr, monthStr]);

  const getToday = () => {
    const today = moment().format('YYYY-MM-DD');
    setToday(today);
  };

  const getCurrentMonth = () => {
    const month = moment().format('MMMM');
    setCurrentMonth(month);
  };

  const getCurrentYear = () => {
    const year = moment().year().toString();
    setCurrentYear(year);
  };

  const getYearStr = () => {
    const yearStr = moment().year().toString();
    setYearStr(yearStr);
  };

  const getMonthStr = () => {
    const monthStr = moment().format('MM');
    setMonthStr(monthStr);
  };

  const getWeekDays = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    setWeekDays(weekDays);
  };

  const getAvailableDaysInMonth = (yearStr: string, monthStr: string) => {
    const dateStr = `${yearStr}-${monthStr}`;
    const availableDaysInMonth = Array.from(Array(moment(dateStr).daysInMonth()), (_, i) => i + 1);

    let formattedAvailableDaysInMonth: DayListData[] = [];
    if (availableDaysInMonth) {
      formattedAvailableDaysInMonth = availableDaysInMonth.map((days: number, i: number) => {
        let formattedDays = '';
        if (days.toString().length === 1) {
          formattedDays = `0${days.toString()}`;
        } else {
          formattedDays = days.toString();
        }

        const fullDateStr = `${dateStr}-${formattedDays.toString()}`;
        const isoWeekDay = moment(fullDateStr).isoWeekday();
        const obj = {
          fullDateStr: fullDateStr,
          isoWeekDay: isoWeekDay,
        };
        return obj;
      });
    }

    if (formattedAvailableDaysInMonth) {
      const firstDayWeekDay = formattedAvailableDaysInMonth[0].isoWeekDay;
      if (firstDayWeekDay > 1) {
        setAddEmptyBox(true);
      }

      const mondayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 1;
      });
      setMondayList(mondayList);

      const tuesdayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 2;
      });
      setTuesdayList(tuesdayList);

      const wednesdayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 3;
      });
      setWednesdayList(wednesdayList);

      const thursdayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 4;
      });
      setThursdayList(thursdayList);

      const fridayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 5;
      });
      setFridayList(fridayList);

      const saturdayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 6;
      });
      setSaturdayList(saturdayList);

      const sundayList = formattedAvailableDaysInMonth.filter((item: DayListData, i: number) => {
        return item.isoWeekDay === 7;
      });
      setSundayList(sundayList);
    }
  };

  const renderWeekDays = (weekDays: string[]) => {
    let weekDaysDiv = null;

    if (weekDays) {
      weekDaysDiv = weekDays.map((item: string, i: number) => {
        return (
          <Col key={i}>
            <View>
              <Text style={{ fontSize: 18, color: '#bfbfbf', textAlign: 'center' }}>{item}</Text>
            </View>
          </Col>
        );
      });
    }

    return weekDaysDiv;
  };

  const renderDayListDiv = (dayList: DayListData[], firstColumn: boolean) => {
    const dayListDiv: any[] = [];

    if (dayList) {
      const today = moment().format('YYYY-MM-DD');

      // determine first column to move down
      if (firstColumn && addEmptyBox) {
        const resultDiv = (
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: 40,
                height: 40,
                borderRadius: 5,
                marginTop: 25,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <View>
              <Text style={{ color: 'transparent' }}>0</Text>
            </View>
          </View>
        );
        dayListDiv.push(resultDiv);
      }

      // determine other column to move down
      if (dayList.length < mondayList.length) {
        const resultDiv = (
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: 'transparent',
                width: 40,
                height: 40,
                borderRadius: 5,
                marginTop: 25,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <View>
              <Text style={{ color: 'transparent' }}>0</Text>
            </View>
          </View>
        );
        dayListDiv.push(resultDiv);
      }

      // normal column
      dayList.forEach((item: DayListData, i: number) => {
        const day = moment(item.fullDateStr).format('D');
        const moodStr = props.journals[i];

        const color = mood[moodStr];

        const resultDiv = (
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View
              style={{
                backgroundColor: color || '#e5e5e5',
                width: 40,
                height: 40,
                borderRadius: 5,
                marginTop: 25,
                marginBottom: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View>{renderEmojiIcon(moodStr)}</View>
            </View>
            <View>{renderTodayText(today, item.fullDateStr, day)}</View>
          </View>
        );
        dayListDiv.push(resultDiv);
      });
    }

    return dayListDiv;
  };

  const renderTodayText = (today: string, fullDateStr: string, day: string) => {
    let todayText = <Text style={{ fontSize: 15, color: 'gray' }}>{day}</Text>;

    if (today === fullDateStr) {
      todayText = (
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          {day}
        </Text>
      );
    }

    return todayText;
  };

  const renderEmojiIcon = (moodStr: string) => {
    let emojiIcon = null;

    switch (moodStr) {
      case 'good':
        emojiIcon = <Entypo name="emoji-happy" size={24} color="black" />;
        break;
      case 'okay':
        emojiIcon = <Entypo name="emoji-neutral" size={24} color="black" />;
        break;
      case 'bad':
        emojiIcon = <Entypo name="emoji-sad" size={24} color="black" />;
        break;
      default:
        break;
    }

    return emojiIcon;
  };

  const handleDecreaseMonth = () => {
    const month = moment(today).subtract(1, 'month').format('MMMM');
    setCurrentMonth(month);

    const monthStr = moment(today).subtract(1, 'month').format('MM');
    setMonthStr(monthStr);

    const newToday = moment(today).subtract(1, 'month').format('YYYY-MM-DD');
    setToday(newToday);

    const year = moment(today).subtract(1, 'month').year().toString();
    setCurrentYear(year);

    const yearStr = moment(today).subtract(1, 'month').year().toString();
    setYearStr(yearStr);
  };

  const handleIncreaseMonth = () => {
    const month = moment(today).add(1, 'month').format('MMMM');
    setCurrentMonth(month);

    const monthStr = moment(today).add(1, 'month').format('MM');
    setMonthStr(monthStr);

    const newToday = moment(today).add(1, 'month').format('YYYY-MM-DD');
    setToday(newToday);

    const year = moment(today).add(1, 'month').year().toString();
    setCurrentYear(year);

    const yearStr = moment(today).add(1, 'month').year().toString();
    setYearStr(yearStr);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
            <Text style={styles.currentMonth}>{currentMonth}</Text>
            <Text style={styles.currentYear}>{currentYear}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleDecreaseMonth()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIncreaseMonth()} style={{ marginLeft: 10 }}>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 40 }}>
          <Grid>{renderWeekDays(weekDays)}</Grid>
        </View>

        <View>
          <Grid>
            <Col>{renderDayListDiv(mondayList, true)}</Col>
            <Col>{renderDayListDiv(tuesdayList, false)}</Col>
            <Col>{renderDayListDiv(wednesdayList, false)}</Col>
            <Col>{renderDayListDiv(thursdayList, false)}</Col>
            <Col>{renderDayListDiv(fridayList, false)}</Col>
            <Col>{renderDayListDiv(saturdayList, false)}</Col>
            <Col>{renderDayListDiv(sundayList, false)}</Col>
          </Grid>
        </View>
      </View>
    </ScrollView>
  );
}

export default CalendarView;
