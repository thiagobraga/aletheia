import React, { Component } from "react";
import { Layout, Row } from "antd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { withTranslation } from "react-i18next";
import "./App.less";

import ClaimCreate from "./components/Claim/ClaimCreate";
import ClaimView from "./components/Claim/ClaimView";
import PersonalityList from "./components/Personality/PersonalityList";
import PersonalityView from "./components/Personality/PersonalityView";
import PersonalityCreate from "./components/Personality/PersonalityCreate";
import AletheiaHeader from "./components/Header/AletheiaHeader";
import BackButton from "./components/BackButton";

const { Footer, Content } = Layout;

class App extends Component {
    render() {
        const { t } = this.props;
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <AletheiaHeader />
                <Content>
                    <Router>
                        <Row style={{ padding: "0 30px", marginTop: "10px" }}>
                            <BackButton />
                        </Row>
                        <Switch>
                            <Route exact path="/" component={PersonalityList} />
                            <Route
                                exact
                                path="/personality"
                                component={PersonalityList}
                            />
                            <Route
                                exact
                                path="/personality/create"
                                component={PersonalityCreate}
                            />
                            <Route
                                exact
                                path="/personality/:id"
                                component={PersonalityView}
                            />
                            <Route
                                exact
                                path="/personality/:id/claim/create"
                                component={ClaimCreate}
                            />
                            <Route
                                exact
                                path="/personality/:id/claim/:claimId"
                                component={ClaimView}
                            />
                        </Switch>
                    </Router>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    {t("footer:copyright")}
                </Footer>
            </Layout>
        );
    }
}

export default withTranslation()(App);
