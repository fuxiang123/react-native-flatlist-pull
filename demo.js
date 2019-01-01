import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';

import {PullList} from 'react-native-flatlist-pull';

export default class extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [0],
      isRefreshing:false,
      isLoadMore:false
    };
    this.loadMore = this.loadMore.bind(this);
    this.topIndicatorRender = this.topIndicatorRender.bind(this);
    this.onPullRelease=this.onPullRelease.bind(this);
    this.loadMore=this.loadMore.bind(this);
  }

  componentWillMount() {
    this.requestData(10);
  }

  topIndicatorRender(pulling, pullok, pullrelease) {
    const hide = {position: 'absolute', left: 10000};
    const show = {position: 'relative', left: 0};
    setTimeout(() => {
      if (pulling) {
        this.txtPulling && this.txtPulling.setNativeProps({style: show});
        this.txtPullok && this.txtPullok.setNativeProps({style: hide});
        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
      } else if (pullok) {
        this.txtPulling && this.txtPulling.setNativeProps({style: hide});
        this.txtPullok && this.txtPullok.setNativeProps({style: show});
        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
      } else if (pullrelease) {
        this.txtPulling && this.txtPulling.setNativeProps({style: hide});
        this.txtPullok && this.txtPullok.setNativeProps({style: hide});
        this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
      }
    }, 1);
    return (
      <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: 60,zIndex:1}}>
        <ActivityIndicator size="small" color="red" />
        <View ref={(c) => {this.txtPulling = c;}}>
          <Text style={styles.indicatorText}>继续下拉刷新...</Text>
        </View>
        <View ref={(c) => {this.txtPullok = c;}}>
          <Text style={styles.indicatorText}>松开刷新......</Text>
        </View>
        <View ref={(c) => {this.txtPullrelease = c;}}>
          <Text style={styles.indicatorText}>刷新中......</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
        <PullList
          //FlatList基本属性
          data={this.state.data}
          renderItem={({item,index})=>this.renderItem(item,index)}
          keyExtractor={(item, index) => item.toString()}

          //FlatList上拉加载更多
          ListFooterComponent={()=>this.ListFooterComponent()}
          onEndReached={()=>this.loadMore()}
          onEndReachedThreshold={0.2}

          //PullList下拉刷新
          onPullRelease={this.onPullRelease}
          topIndicatorRender={this.topIndicatorRender}
          topIndicatorHeight={60}
          //控制下拉刷新状态的属性，为true时显示头部刷新组件，为false则隐藏
          isRefreshing={this.state.isRefreshing}
        />
    );
  }

  onPullRelease(resolve) {
    this.setState({isRefreshing:true});
    //do something
    setTimeout(() => {
      //真实情况下，应在请求网络数据后的回调中修改isRefreshing
      this.setState({isRefreshing:false})
    }, 2000);
  }

  renderItem(item,index) {
    return (
      <View style={{height: 100, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize:30}}>{item}</Text>
      </View>
    );
  }

  ListFooterComponent=()=>{
    const {isLoadMore}=this.state;
    if(isLoadMore) {
      return (
        <View style={{ height: px2dp(80), alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <ActivityIndicator size="small" color="red"/>
          <Text style={{ fontSize: 25, marginLeft: 5 }}>{'正在加载中……'}</Text>
        </View>
      )
    }else return <View/>
  };

  loadMore=()=>{
    if(!this.state.isLoadMore) {
      this.setState({ isLoadMore: true });
      //do something
      this.requestData(3);
      //真实情况下，应在请求网络数据后的回调中修改isLoadMore
      setTimeout(() => {
        this.setState({ isLoadMore: false })
      }, 2000);
    }
  };

  requestData=(dataLength)=>{
    let currentLength=this.state.data.length;
    for(let i=currentLength;i<currentLength+dataLength;i++) {
      this.state.data.push(i)
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
  },
});