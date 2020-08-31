import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import _ from 'lodash';
import moment from 'moment';

import CalendarView from '../calendarView/CalendarView';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function MainView(): JSX.Element {
  const [journals, setJournals] = useState<string[]>([]);

  useEffect(() => {
    getJournals();
  }, []);

  const getJournals = () => {
    const yearStr = moment().year().toString();
    const monthStr = moment().format('MM');
    const dateStr = `${yearStr}-${monthStr}`;
    const availableDaysInMonth = Array.from(Array(moment(dateStr).daysInMonth()), (_, i) => i + 1);

    const journalsList: string[] = [];
    const moodList = ['good', 'okay', 'bad', 'null'];

    for (let i = 0; i < availableDaysInMonth.length; i++) {
      const randomMood = _.sample(moodList);
      if (randomMood) journalsList.push(randomMood);
    }

    const randomJournalsList = _.shuffle(journalsList);
    setJournals(randomJournalsList);
  };

  return (
    <View style={styles.container}>
      <CalendarView journals={journals} />
    </View>
  );
}

export default MainView;
