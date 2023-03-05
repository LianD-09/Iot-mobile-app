import * as React from 'react';
import {useWindowDimensions} from 'react-native';
import {TabView, TabBar, SceneMap} from 'react-native-tab-view';
import User from '../../components/User/User';
import TodoList from '../../components/Todo/TodoList';

const renderScene = SceneMap({
  first: User,
  second: TodoList,
});

export default function UserScreen() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'User information'},
    {key: 'second', title: 'Todo list'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => <TabBar {...props} style={{backgroundColor: '#806962'}}/>}
    />
  );
}
