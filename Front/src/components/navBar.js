/**
 * Copyright(c) dtysky<dtysky@outlook.com>
 * Created: 16/9/24
 * Description:
 */

import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

import actionTypes from '../actions';
import {getLocalUrl} from '../utils';
import * as themeReducer from '../reducers/theme';

import '../theme/css/nav-bar.less';


export default class NavBar extends Component {
    static propTypes = {
        dispatch: PropTypes.func,
        theme: PropTypes.object
    };

    static defaultProps = {
        theme: themeReducer.defaultState
    };

    constructor(props) {
        super(props);
        this.list = [
            {
                id: 'title-create',
                theme: 'Create'
            },
            {
                id: 'title-skill',
                theme: 'Skill'
            },
            {
                id: 'title-art',
                theme: 'Art'
            },
            {
                id: 'title-life',
                theme: 'Life'
            }
        ];
    }

    shouldComponentUpdate(nextProps) {
        return !this.props.theme.get('current').equals(nextProps.theme.get('current'));
    }

    changeTheme(theme: string) {
        const {dispatch} = this.props;
        dispatch({type: actionTypes.change.theme.current, theme});
    }

    render() {
        // Todo: 修改样式注意, 拥有修改主题能力的链接之间区块空隙应当为0,来防止不必要的执行!
        const titleBar = this.refs.titleBar;
        const theme = this.props.theme.get('current').toJS();
        const titleBarStyle = {};

        if (titleBar) {
            const id = (this.list.filter(item =>
                item.theme === theme.name
            )[0] || []).id;
            const nav = this.refs[id];
            const left = nav ? nav.offsetLeft : titleBar.offsetLeft + 10;
            titleBarStyle.width = nav ? nav.offsetWidth + 20 : titleBar.offsetWidth;
            titleBarStyle.backgroundColor = nav ? theme.color : 'rgba(0, 0, 0, 0)';
            titleBarStyle.transform = nav ? `translateX(${left - 10}px)` : titleBar.style.transform;
        }

        return (
            <div id="nav-bar">
                <nav className="list">
                    {
                        this.list.map(item =>
                            <li
                                key={item.id}
                                id={item.id}
                                onMouseEnter={() => this.changeTheme(item.theme)}
                            >
                                <Link to={getLocalUrl('category', item.theme)}>
                                    <span ref={item.id}>{item.theme}</span>
                                </Link>
                            </li>
                        )
                    }
                </nav>
                <div className="bar-container">
                    <span
                        className="bar duration-1s"
                        ref="titleBar"
                        style={titleBarStyle}
                    />
                </div>
            </div>
        );
    }
}
