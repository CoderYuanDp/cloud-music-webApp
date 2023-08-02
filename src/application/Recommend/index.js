// Recommend
import React, { useEffect} from 'react';
import Slider from '../../components/Slider';
import RecommendList from '../../components/List';
import Scroll from '../../baseUI/scroll';
import styled from'styled-components';
import { connect } from "react-redux";
import * as actionTypes from './store/actionCreators';
import { forceCheck } from 'react-lazyload';
import Loading from '../../baseUI/loading/index';
import { renderRoutes } from 'react-router-config';

const Content = styled.div`
  position: fixed;
  top: 90px;
  bottom: 0;
  width: 100%;
`

function Recommend(props) {
  const { bannerList, recommendList, enterLoading } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;
  
  useEffect (() => {
    // 优化缓存数据
    if (!bannerList.size){
      getBannerDataDispatch ();
    }
    if (!recommendList.size){
      getRecommendListDataDispatch ();
    }
    //eslint-disable-next-line
  }, []);

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  return (
    <Content>
      <Scroll className='list' onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}></Slider>
          <RecommendList recommendList={recommendListJS}></RecommendList> 
        </div>
      </Scroll>
      { enterLoading ? <Loading></Loading> : null }
      { renderRoutes (props.route.routes) }
    </Content>
  )
}

// 映射 Redux 全局的 state 到组件的 props 上
const mapStateToProps = (state) => ({
  bannerList: state.getIn(['recommend', 'bannerList']),
  recommendList: state.getIn(['recommend', 'recommendList']),
  enterLoading: state.getIn (['recommend', 'enterLoading'])
});
// 映射 dispatch 到 props 上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch () {
      dispatch (actionTypes.getBannerList());
    },
    getRecommendListDataDispatch () {
      dispatch (actionTypes.getRecommendList());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))