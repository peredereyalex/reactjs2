import * as React from 'react';

export const FilterTags = React.createClass({
    componentDidMount() {

    },
    getById(id){
        return this.props.items.filter(function(item) {
            return item.id == id
        })[0];
    },
    tagDelete(e, id){
        this.props.onDelete(id);
    },
    render() {
        var tagDelete = this.tagDelete,
            getById = this.getById,
            type = this.props.type;

        var tags = this.props.tags.map(function(id) {
            var item = getById(id);
            var icon = "";
            if(type=="icon"){
                icon = <div className="page-filter-tag__icon" style={{background: "url("+item.icon+")"}}></div>;
            }
            if(type=="color"){
                icon = <div className="page-filter-tag__color" style={{background: item.color}}></div>;
            }
            return (
                <div key={id} className="page-filter-tag">
                    {icon}
                    <div className="page-filter-tag__text">{item.name}</div>
                    <div className="page-filter-tag__close" onClick={(event)=>tagDelete(event, item.id)}></div>
                </div>
            );
        });
        return (
            <div className="page-filter__item wide">
                <label>{this.props.tags.length>0 ? this.props.label : ''}</label>
                <div className="page-filter-tags">
                    {tags}
                </div>
            </div>
        );
    }
})
