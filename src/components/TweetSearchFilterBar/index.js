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

    deleteSelection(){
      this.props.push('/')
    }

    changeCount(event, key, val){
      this.props.changeFilterAndFetchTweets('count', val, location.origin, this.props.trend)
    }

    changeSort(event, key, val){
      this.props.changeFilterAndFetchTweets('result_type', val, location.origin, this.props.trend)
    }

    changeRadius(event, key, val){
      this.props.changeFilterAndFetchTweets('radius', val, location.origin, this.props.trend)
    }

    changeBeforeDate(event, date){
      this.props.changeFilterAndFetchTweets('before', date, location.origin, this.props.trend)
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
                    value={this.props.count}
                    floatingLabelText="# of Tweets per request:"
                    floatingLabelFixed={true}
                    onChange={this.changeCount.bind(this)}>
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={25} primaryText="25" />
                    <MenuItem value={50} primaryText="50" />
                    <MenuItem value={100} primaryText="99" />
                  </SelectField>

                  <SelectField
                    disabled={this.props.loading}
                    value={this.props.radius}
                    floatingLabelText="Search radius (from city hall):"
                    floatingLabelFixed={true}
                    onChange={this.changeRadius.bind(this)}>
                    <MenuItem value={'25'} primaryText="25 km" />
                    <MenuItem value={'50'} primaryText="50 km" />
                    <MenuItem value={'100'} primaryText="100 km" />
                    <MenuItem value={'150'} primaryText="150 km" />
                    <MenuItem value={'250'} primaryText="250 km" />
                  </SelectField>

  

            </div> : null }
        </div>
  		)
  	}

}

/*                 
                <DatePicker 
                    disabled={this.props.loading}
                    autoOk={true}
                    floatingLabelText="Before:"
                    defaultDate={new Date()}
                    maxDate={new Date()}
                    minDate={minDate}
                    onChange={this.changeBeforeDate.bind(this)}/>

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
*/

export default TweetSearchFilterBar