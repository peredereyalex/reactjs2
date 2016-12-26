import * as React from 'react';

import { EventStore } from '../stores/EventStore.jsx';

import PerfectScrollbar from 'react-perfect-scrollbar';

export const XSelect = React.createClass({
    getInitialState() {
        return({
            dropdown: false,
            search: "",
            searchFocused: false,
        })
    },
    componentDidMount() {
        EventStore.bind(EventStore.events.select.hide, this.dropdownHide);
        window.addEventListener('click', this.hideAllSelects, false);
    },
    componentWillUnmount() {
        EventStore.unbind(EventStore.events.select.hide, this.dropdownHide);
        window.removeEventListener('click', this.hideAllSelects, false);
    },
    hideAllSelects(){
        EventStore.trigger(EventStore.events.select.hide);
    },
    dropdownHide(){
        if(this.state.searchFocused)
            return;
        this.setState({
            dropdown: false
        });
    },
    dropdownToggle(e){
        e.stopPropagation();
        var lastState = this.state.dropdown;
        EventStore.trigger(EventStore.events.select.hide);
        this.setState({
            dropdown: !lastState
        });
    },
    searchFilter(e){
        this.setState({ search: e.target.value });
    },
    searchFocus(e){
        this.setState({ searchFocused: true });
        e.preventDefault();
        e.stopPropagation();
    },
    searchBlur(e){
        this.setState({ searchFocused: false });
    },
    itemSelect(e, id){
        EventStore.trigger(EventStore.events.select.hide);
        this.props.onSelect(id);
    },
    render() {
        var itemSelect = this.itemSelect,
            type = this.props.type,
            value = this.props.value,
            search = "",
            items = (this.props.items) ? this.props.items : [];


        if(this.props.search){
            search = <div className="x-select__search"><input type="text" placeholder="Поиск" value={this.state.search} onChange={this.searchFilter} onFocus={this.searchFocus} onBlur={this.searchBlur}/></div>;
            items = items.filter(function(item){
                return item.name.toLowerCase().includes(this.state.search.toLowerCase())
            }.bind(this));
        }
        if(this.props.value==0 || this.props.value == "0" || this.props.value==""){
            if(this.props.placeholder){
                value = <span className="x-select__placeholder">{this.props.placeholder}</span>;
            }
        }else{
            if(this.props.valueFromId && this.props.value && this.props.value != ""){
                value = this.props.items.filter(function(item){
                    return item.id == this.props.value;
                }.bind(this));
                if(value.length>0){
                    value = value[0].name;
                }else{
                    value = "";
                }
            }
        }

        var items_list = items.map(function(item) {
            var icon = "";
            if(type=="icon"){
                icon = <i style={{background: "url("+item.icon+")"}}></i>;
            }
            if(type=="color"){
                icon = <i className="x-select__color" style={{background: item.color}}></i>;
            }
            return (
                <li key={item.id} onClick={(event)=>itemSelect(event, item.id)}>
                    {icon}
                    <span>{item.name}</span>
                </li>
            );
        });

        if(items.length>6){
            var list = <ul style={{height: "180px"}}>
                <PerfectScrollbar>{items_list}</PerfectScrollbar>
            </ul>;
        }else{
            var list = <ul>{items_list}</ul>;
        }


        var label = (this.props.label) ? <label className="x-select__label">{this.props.label}</label> : "";
        return (
            <div className="x-select">
                {label}
                <div className="x-select__input">
                    <div className="x-select__value" onClick={this.dropdownToggle}>{value}</div>
                    <i className="mdi select__arrow">keyboard_arrow_down</i>

                    <div className={this.state.dropdown ? 'x-select__list active' : 'x-select__list'}>
                        {search}
                        {list}
                    </div>
                </div>
            </div>
        );
    }
})
