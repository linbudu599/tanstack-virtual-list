import React from 'react';

import { Card, Spacer, Tabs, Text, Grid } from '@geist-ui/core';

import FixedVirtualList from './FixedList';
import FixedHorizontalVirtualList from './FixedHorizontalList';
import FixedListControl from './FixedListControl';
import FixedInfiniteList from './FixedInfiniteList';

import DynamicVirtualList from './DynamicList';
import DynamicHorizontalVirtualList from './DynamicHorizontalList';
import DynamicListControl from './DynamicListControl';
import DynamicInfiniteList from './DynamicInfiniteList';

import './index.css';

const FixedExamples: Record<string, React.FC> = {
  'fixed-list': FixedVirtualList,
  'fixed-horizontal-list': FixedHorizontalVirtualList,
  'fixed-list-control': FixedListControl,
  'fixed-infinite-list': FixedInfiniteList,
};

const DynamicExamples: Record<string, React.FC> = {
  'dynamic-list': DynamicVirtualList,
  'dynamic-horizontal-list': DynamicHorizontalVirtualList,
  'dynamic-list-control': DynamicListControl,
  'dynamic-infinite-list': DynamicInfiniteList,
};

function RenderExamples(props: {
  title: string;
  config: Record<string, React.FC>;
}) {
  return (
    <>
      <Card shadow>
        <Text h4 my={0}>
          {props.title}
        </Text>
        <Tabs initialValue={Object.keys(props.config)[0]}>
          {Object.entries(props.config).map(([title, Component], key) => {
            const label = title
              .split('-')
              .map((str) => `${str[0].toUpperCase() + str.slice(1)}`)
              .join(' ');

            return (
              <Tabs.Item label={label} value={title} key={title}>
                <Component />
              </Tabs.Item>
            );
          })}
        </Tabs>
      </Card>
    </>
  );
}

function App() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {RenderExamples({ title: 'Fixed Virtual List', config: FixedExamples })}
      <Spacer h={2} />
      {RenderExamples({
        title: 'Dynamic Virtual List',
        config: DynamicExamples,
      })}
    </div>
  );
}

export default App;
