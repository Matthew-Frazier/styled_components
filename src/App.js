import React, { useState, useEffect, } from 'react';
import axios from 'axios';
import styled, { keyframes, } from 'styled-components';
import HeaderText from "./styles/HeaderText"
import { Header, Button, Segment, Card, Icon, Grid, } from 'semantic-ui-react';
import { getNegativePatternsAsPositive } from 'fast-glob/out/managers/tasks';

function App() {
  const [repos, setRepos] = useState([]);

  // useEffect( () => {
  //   // API rate limits and hot reloading don't mix
  //   // getRepos()
  // }, []);

  const getRepos = () => {
    axios.get("https://api.github.com/users/Matthew-Frazier/repos?sort=created")
      .then( res => setRepos(res.data))
  };

  return (
    <AppContainer>
      <StyledButton onClick={getRepos}>Get Repos</StyledButton>
      <Header as={HeaderText} fSize="large">My Portfolio</Header>
      <Segment as={Transparent}>
        <Header as={HeaderText}>My Projects</Header>
        <Grid>
          <Grid.Row>
            { repos.map( r => 
              <Grid.Column key={r.id} width={4}>
                <StyledCard>
                  <Card.Content>
                    <Card.Header>
                      <Truncated>
                        { r.full_name }
                      </Truncated>
                    </Card.Header>
                    <Card.Meta>
                      { r.description }
                    </Card.Meta>
                    { r.stargazers_count > 0 &&
                      <Star>
                        <Icon name="star" size="huge"/>
                        <p>star</p>
                      </Star>
                    }
                  </Card.Content>
                </StyledCard>
              </Grid.Column>
            )}
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment as={Transparent}>
        <Header as={HeaderText}>Contact</Header>
      </Segment>
    </AppContainer>
  );
};

const StyledButton = styled.div`
  display: flex;
  background: #312d2d;
  color: white;
  padding: 15px 25px;
  justify-content: center;
  transition: background 0.2s ease;
  cursor: pointer;
  width: 150px;
  border-radius: 5px;

  &:hover {
    background: #606060;
    transition: background 0.2s ease;
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;

  /* this allows you to style a child element from a parent */
  & > p {
    text-decoration: line-through;
  }
`;

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCard = styled(Card)`
  height: 200px;
`;

const AppContainer = styled.div`
  background: #00F260;
  background: -webkit-linear-gradient(to right, #0575E6, #00F260);
  background: linear-gradient(to right, #0575E6, #00F260);
`;

const Transparent = styled.div`
  background: transparent !important;
`;

export default App;
