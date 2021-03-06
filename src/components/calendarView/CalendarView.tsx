import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import _ from 'lodash';
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

  const [mondayEmptyBox, setMondayEmptyBox] = useState(false);
  const [tuesdayEmptyBox, setTuesdayEmptyBox] = useState(false);
  const [wednesdayEmptyBox, setWednesdayEmptyBox] = useState(false);
  const [thursdayEmptyBox, setThursdayEmptyBox] = useState(false);
  const [fridayEmptyBox, setFridayEmptyBox] = useState(false);
  const [saturdayEmptyBox, setSaturdayEmptyBox] = useState(false);
  const [sundayEmptyBox, setSundayEmptyBox] = useState(false);

  const [journals, setJournals] = useState<string[]>([]);

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

  useEffect(() => {
    setJournals(props.journals);
  }, [props.journals]);

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

      const firstWeekMonday = mondayList[0].fullDateStr;
      const firstWeekTuesday = tuesdayList[0].fullDateStr;
      const firstWeekWednesday = wednesdayList[0].fullDateStr;
      const firstWeekThursday = thursdayList[0].fullDateStr;
      const firstWeekFriday = fridayList[0].fullDateStr;
      const firstWeekSaturday = saturdayList[0].fullDateStr;
      const firstWeekSunday = sundayList[0].fullDateStr;

      if (moment(firstWeekMonday).isAfter(moment(firstWeekTuesday))) {
        setMondayEmptyBox(true);
      }
      if (moment(firstWeekTuesday).isAfter(moment(firstWeekWednesday))) {
        setTuesdayEmptyBox(true);
      }
      if (moment(firstWeekWednesday).isAfter(moment(firstWeekThursday))) {
        setWednesdayEmptyBox(true);
      }
      if (moment(firstWeekThursday).isAfter(moment(firstWeekFriday))) {
        setThursdayEmptyBox(true);
      }
      if (moment(firstWeekFriday).isAfter(moment(firstWeekSaturday))) {
        setFridayEmptyBox(true);
      }
      if (moment(firstWeekSaturday).isAfter(moment(firstWeekSunday))) {
        setSaturdayEmptyBox(true);
      }
      if (moment(firstWeekSunday).isAfter(moment(firstWeekMonday))) {
        setSundayEmptyBox(true);
      }
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

  const renderDayListDiv = (dayList: DayListData[], addEmptyBox: boolean) => {
    const dayListDiv: any[] = [];

    if (dayList) {
      const today = moment().format('YYYY-MM-DD');

      // determine column to move down
      if (addEmptyBox) {
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
        const moodStr = journals[i];

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
    const randomJournalsList = _.shuffle(journals);
    setJournals(randomJournalsList);

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
    const randomJournalsList = _.shuffle(journals);
    setJournals(randomJournalsList);

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

          {/* <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleDecreaseMonth()}>
              <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleIncreaseMonth()} style={{ marginLeft: 10 }}>
              <AntDesign name="arrowright" size={24} color="black" />
            </TouchableOpacity>
          </View> */}
        </View>

        <View style={{ marginTop: 40 }}>
          <Grid>{renderWeekDays(weekDays)}</Grid>
        </View>

        <View>
          <Grid>
            <Col>{renderDayListDiv(mondayList, mondayEmptyBox)}</Col>
            <Col>{renderDayListDiv(tuesdayList, tuesdayEmptyBox)}</Col>
            <Col>{renderDayListDiv(wednesdayList, wednesdayEmptyBox)}</Col>
            <Col>{renderDayListDiv(thursdayList, thursdayEmptyBox)}</Col>
            <Col>{renderDayListDiv(fridayList, fridayEmptyBox)}</Col>
            <Col>{renderDayListDiv(saturdayList, saturdayEmptyBox)}</Col>
            <Col>{renderDayListDiv(sundayList, sundayEmptyBox)}</Col>
          </Grid>
        </View>
      </View>
    </ScrollView>
  );
}

export default CalendarView;
