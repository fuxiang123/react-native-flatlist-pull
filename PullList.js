'use strict';

import React, { Component } from 'react';
import { FlatList } from 'react-native';

import Pullable from './Pullable';

/**
 支持android&ios可以下拉刷新的PullList组件
 Demo:
 import {PullList} from 'react-native-pullview';
 <PullList onPulling={} onPullOk={} onPullRelease={} isPullEnd={true}
 topIndicatorRender={({pulling, pullok, pullrelease}) => {}} topIndicatorHeight={60}
 {...ListView.props}
 >
 Demo2:
 topIndicatorRender(pulling, pullok, pullrelease) {
        return <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60}}>
            <ActivityIndicator size="small" color="gray" />
            {pulling ? <Text>下拉刷新2...</Text> : null}
            {pullok ? <Text>松开刷新2......</Text> : null}
            {pullrelease ? <Text>玩命刷新中2......</Text> : null}
        </View>;
    }
 <PullList onPullRelease={this.props.onRefresh} topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60} {...ListView.props} />
 */

export default class extends Pullable {
  constructor(props) {
    super(props);
    this.getMetrics = this.getMetrics.bind(this);
    this.scrollToOffset = this.scrollToOffset.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.listType = 'flat';
    this.listHeight=0;
  }

  getMetrics(args) {
    this.scroll.getMetrics(args);
  }

  scrollToOffset(...args) {
    this.scroll.scrollToOffset(...args);
  }

  scrollToEnd(args) {
    this.scroll.scrollToEnd(args);
  }

  onContentSizeChange(contentWidth, contentHeight){
    this.listHeight=contentHeight;
  }

  getScrollable() {
    return (
      <FlatList
        ref={(c) => {
          this.scroll = c;
        }}
        scrollEnabled={this.state.scrollEnabled}
        onScroll={this.onScroll}
        onContentSizeChange={this.onContentSizeChange.bind(this)}
        {...this.props}
      />
    );
  }
}
