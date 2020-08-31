import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Col, Grid } from 'react-native-easy-grid';
import moment from 'moment';
import { Entypo } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  viewContainer: {
    marginVertical: 50,
    padding: 25,
  },
  currentMonth: {
    fontSize: 30,
    color: 'black',
  },
  currentYear: {
    fontSize: 30,
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
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');
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
    getCurrentMonth();
    getCurrentYear();
    getWeekDays();
    getAvailableDaysInMonth();
  }, []);

  const getCurrentMonth = () => {
    const month = moment().format('MMMM');
    setCurrentMonth(month);
  };

  const getCurrentYear = () => {
    const year = moment().year().toString();
    setCurrentYear(year);
  };

  const getWeekDays = () => {
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    setWeekDays(weekDays);
  };

  const getAvailableDaysInMonth = () => {
    const yearStr = moment().year().toString();
    const monthStr = moment().format('MM');
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

  const renderWeekDays = () => {
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.currentMonth}>{currentMonth}</Text>
          <Text style={styles.currentYear}>{currentYear}</Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <Grid>{renderWeekDays()}</Grid>
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
