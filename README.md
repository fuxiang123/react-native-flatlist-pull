# react-native-flatlist-pull

  react-native-flatlist-pull是一个基于FlatList,支持Android和iOS的下拉刷新列表组件。是在另一个项目[react-native-pull](https://github.com/greatbsky/react-native-pull)的基础上进行修改而成。主要将原项目中已经过时的ListView替换成较新的FlatList，同时去掉了原项目中存在BUG的PullView。

## `PullList` Usage
  1. 使用npm：`npm install react-native-flatlist-pull@latest --save` 
    使用yarn：`yarn add react-native-flatlist-pull`
  2. 编写代码:
  ```
    import {PullList} from 'react-native-pull';

    onPullRelease(resolve) {
      //do something
      setTimeout(() => {
            resolve();
        }, 3000);
    }
	
	
       <PullList
          onPullRelease={this.onRefresh}
          // topIndicatorRender={this.topIndicatorRender}
          topIndicatorHeight={60}
          isRefreshing={shop.isRefreshing}
		  
		  {...and some FlatList Props}
        />
  ```
  3. 完整demo代码:暂无


## `PullView` & `PullList`  configuration

**PullList 下拉效果属性**

  * **`style`**: 设置组件样式，比如可以设置width/height/backgroudColor等
  * **`onPulling`**: 处于`pulling`状态时执行的方法
  * **`onPullOk`**: 处于`onPullOk`状态时执行的方法
  * **`onPullRelease`**: 处于`pullrelease`状态时执行的方法
  * **`topIndicatorRender`**: 顶部刷新指示组件的渲染方法, 接受4个参数: `ispulling`, `ispullok`, `ispullrelease`，`gesturePosition`，你可以使用`gesturePosition`定义动画头部.
  * **`topIndicatorHeight`**: 顶部刷新指示组件的高度, 若定义了`topIndicatorRender`则同时需要此属性
  * **`isPullEnd`**: 是否已经下拉结束，若为true则隐藏顶部刷新指示组件，非必须
  * **`isRefreshing`**: 标示下拉刷新状态的属性，同react-native官网FlatList中的属性[refreshing](https://reactnative.cn/docs/flatlist/#refreshing)作用类似。为true显示头部刷新指示器，为false则隐藏头部刷新指示器
  
**PullList 上拉加载更多，可直接使用官网FlatList的属性[onEndReached](https://reactnative.cn/docs/flatlist/#onendreached)与[onEndReachedThreshold](https://reactnative.cn/docs/flatlist/#onEndReachedThreshold)进行实现，详情请见[demo]()(暂无)**
  
## Licensed
  MIT License
