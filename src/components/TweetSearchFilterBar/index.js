import React, {Component} from 'react'
import styles from './style.css'

import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';
import DropDownIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DropUpIcon from 'material-ui/svg-icons/navigation/arrow-drop-up';

import DatePicker from 'material-ui/DatePicker';

class TweetSearchFilterBar extends Component {

    constructor (props) {
    	super(props) 
    }

    componentDidMount(){}

    deleteSelection(){
      this.props.push('/')
    }

    changeCount(event, key, val){
      this.props.changeFilter('count', val)
      this.props.fetchTweets(location.origin, this.props.trend, this.props.max_id)
    }

    changeSort(event, key, val){
      this.props.changeFilter('result_type', val)
      this.props.fetchTweets(location.origin, this.props.trend, this.props.max_id)
    }

    changeRadius(event, key, val){
      this.props.changeFilter('radius', val)
      this.props.fetchTweets(location.origin, this.props.trend, this.props.max_id)
    }

    changeBeforeDate(event, date){
      this.props.changeFilter('before', date)
      this.props.fetchTweets(location.origin, this.props.trend, this.props.max_id)
    }

  	render (){
      let minDate = new Date()
      minDate.setDate(minDate.getDate() - 7)

  		return (
        <div className={styles.tweetSearchFilterBar} >
          <Chip onRequestDelete={this.deleteSelection.bind(this)}>{this.props.trend}</Chip>
          
          <IconButton onTouchTap={this.props.toggleFilters} tooltip={this.props.showFilters ? 'Hide Filters':'Show Filters'} tooltipPosition='bottom-left'>
            { this.props.showFilters ? <DropUpIcon />:<DropDownIcon />}
          </IconButton>

          { this.props.showFilters ? 
            <div className={styles.filtersContainer}>
                   <SelectField
                    disabled={this.props.loading}
                    value={this.props.sort}
                    floatingLabelText="Sort by:"
                    floatingLabelFixed={true}
                    onChange={this.changeSort.bind(this)}>
                    <MenuItem value={'recent'} primaryText="Most Recent" />
                    <MenuItem value={'popular'} primaryText="Popular" />
                    <MenuItem value={'mixed'} primaryText="Mixed" />
                  </SelectField>

                  <SelectField
                    disabled={this.props.loading}
                    value={this.props.count}
                    floatingLabelText="# of Tweets:"
                    floatingLabelFixed={true}
                    onChange={this.changeCount.bind(this)}>
                    <MenuItem value={'15'} primaryText="15" />
                    <MenuItem value={'25'} primaryText="25" />
                    <MenuItem value={'50'} primaryText="50" />
                    <MenuItem value={'100'} primaryText="100" />
                  </SelectField>

                  <SelectField
                    disabled={this.props.loading}
                    value={this.props.radius}
                    floatingLabelText="Radius:"
                    floatingLabelFixed={true}
                    onChange={this.changeRadius.bind(this)}>
                    <MenuItem value={'50'} primaryText="50 km" />
                    <MenuItem value={'100'} primaryText="100 km" />
                    <MenuItem value={'150'} primaryText="150 km" />
                    <MenuItem value={'250'} primaryText="250 km" />
                  </SelectField>

                  <DatePicker 
                    disabled={this.props.loading}
                    autoOk={true}
                    floatingLabelText="Before:"
                    defaultDate={new Date()}
                    maxDate={new Date()}
                    minDate={minDate}
                    onChange={this.changeBeforeDate.bind(this)}/>

            </div> : null }
        </div>
  		)
  	}

}

/*
          <SelectField
            value='recent'
            style={{width:'140px'}}>
            <MenuItem value={'recent'} primaryText="Most Recent" />
            <MenuItem value={'popular'} primaryText="Popular" />
            <MenuItem value={'mixed'} primaryText="Mixed" />
          </SelectField>

*/

export default TweetSearchFilterBar