import React, { useState, useEffect } from 'react';
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/parse';
import VoteLogLegend from "../components/voteLogLegend";
import styled from '@emotion/styled';
import download from '../images/icons/download/download.png'; 
import search from '../images/icons/search/search-grey.png';
import { media } from "../styles";

const cssContainer = {
  display: "flex",
  padding: "0 22px 26px 22px",
  [media(767)]: {
    padding: "0 43px 12px 57px",
  }
}
const cssWrapper = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [media(767)]: {
    flexDirection: "row"
  }
}
const Style = styled.div`
  .react-autosuggest__suggestions-container {
    max-height: 200px;
    overflow: hidden;
    overflow-y: scroll;
  }
  .react-autosuggest__container {
    position: relative;
  }
  .react-autosuggest__input {
    width: 325px;
    height: 30px;
    padding: 10px 26px;
    font-weight: 300;
    font-size: 16px;
    border: none;
    border-bottom: 1px solid #aaa;
    margin-bottom: 1.8rem;
  }
  .react-autosuggest__input--focused {
    outline: none;
  }
  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .react-autosuggest__suggestions-container {
    display: none;
  }
  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    width: 325px;
    border: 1px solid #aaa;
    background-color: #fff;
    font-size: 16px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }
  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 26px;
  }
  .react-autosuggest__suggestion--highlighted {
    background-color: #f7f7c7;
  }
  .highlight {
    color: black;
    font-weight: bold;
  }
`
const cssClearIcon = {
  position: 'absolute',
  top: '0',
  right: '0',
  width: '18px',
  height: '18px',
  cursor: 'pointer',
  opacity: '0.3',
  "&:hover": {
    opacity: '1',
  },
  "&:before, &:after": {
    position: 'absolute',
    top: '4px',
    right: '12px',
    content: '""',
    height: '18px',
    width: '2px',
    backgroundColor: '#333',
  },
  "&:before": {
    transform: 'rotate(45deg)'
  },
  "&:after": {
    transform: 'rotate(-45deg)'
  }
}
const cssSearchIcon = {
  position: 'absolute',
  top: '8px',
  left: '0',
  width: '15px',
}
const cssAvg = {
  display: "none",
  [media(767)]: {
    display: "unset",
  },
}

const AutoComplete = ({allSenateVoteYaml, setSenatorId, viewPerson, viewGroup}) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [senator, setSenator] = useState([]);

  useEffect(()=>{
    allSenateVoteYaml.nodes.unshift({
      id: "0",
      lastname: "",
      name: "",
      title: "ทั้งหมด",
      votelog: []
    })
    setSenator(allSenateVoteYaml.nodes)
  },[])

  useEffect(()=>{
    setValue(senator[0] ? senator[0].title : '')
  },[senator])
  
  const escapeRegexCharacters = str => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  const getSuggestions = (value,senator) => {
    const escapedValue = escapeRegexCharacters(value.trim());
    const regex =  new RegExp('(?<=[\\s,.:;"\']|^)' + escapedValue, 'gi');
    return senator.filter(person =>
      person.id === '0' || regex.test(getSuggestionValue(person))
    );
  }

  const getSuggestionValue = suggestion => {
    setSenatorId(suggestion.id)
    return `${suggestion.title} ${suggestion.name} ${suggestion.lastname}`;
  };

  const renderSuggestion = (suggestion, { query }) => {
    const suggestionText = `${suggestion.title} ${suggestion.name} ${suggestion.lastname}`;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);
    return (
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;
            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    );
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);   
  };

  const onSuggestionsFetchRequested = ({ value, reason }) => {
    setSuggestions(getSuggestions(value, senator))
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([])
  };

  const shouldRenderSuggestions = () => {
    return true;
  }

  const clearInput = () => {
    setValue('');
  }

  const renderInputComponent = inputProps => (
    <div>
      <div 
        css={cssClearIcon} 
        onClick={clearInput}
      />
      <img
        css={cssSearchIcon} 
        src={search}
      />
      <input {...inputProps} />
    </div>
  );
  
  // mock
  const avgVotelog = {
    approve: 20,
    disprove: 20,
    abstained: 20,
    absent: 20,
    missing: 20
  }
  const cssGroup = {
    fontWeight: 'bold',
    fontSize: '1.8rem',
  }
  return (
    <div css={cssContainer}>
      { viewPerson && (
        <div css={cssWrapper}>
          <Style>
            <Autosuggest
              className='cssSearchboxDropdown'
              suggestions={suggestions}
              onSuggestionsFetchRequested={onSuggestionsFetchRequested}
              onSuggestionsClearRequested={onSuggestionsClearRequested}
              getSuggestionValue={getSuggestionValue}
              shouldRenderSuggestions={shouldRenderSuggestions}
              renderSuggestion={renderSuggestion}
              inputProps={{value,onChange}}
              renderInputComponent={renderInputComponent}
            >
              <img src={download}/>
            </Autosuggest>
          </Style>
          <span css={cssAvg} style={{margin: '0 1.5rem'}}>โดยเฉลี่ย</span>
            <VoteLogLegend {...avgVotelog} />
        </div>
      )}
      { viewGroup && (
        <div css={cssWrapper}>
          <div>
            <span css={cssGroup}>โดยตำแหน่ง</span>
            <VoteLogLegend type='group' {...avgVotelog} />
          </div>
          <div>
            <span css={cssGroup}>คสช. สรรหา</span>
            <VoteLogLegend type='group' {...avgVotelog} />
          </div>
          <div>
            <span css={cssGroup}>ตามกลุ่มอาชีพ</span>
            <VoteLogLegend type='group' {...avgVotelog} />
          </div>
        </div>

      )}
    </div>
  )
}

export default AutoComplete
  