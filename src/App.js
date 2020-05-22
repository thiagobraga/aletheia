import React, { Component } from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.less";

import ClaimCreate from "./components/Claim/ClaimCreate";
import ClaimView from "./components/Claim/ClaimView";
import PersonalityList from "./components/Personality/PersonalityList";
import PersonalityView from "./components/Personality/PersonalityView";
import PersonalityCreate from "./components/Personality/PersonalityCreate";
import AletheiaHeader from "./components/Header/AletheiaHeader";
import { withTranslation } from "react-i18next";

const { Footer, Content } = Layout;

class App extends Component {
    render() {
        const { t } = this.props;
        return (
            <Layout>
                <a href="/">
                    <AletheiaHeader />
                </a>
                <Content>
                    <Router>
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
                    {t("footer.copyright")}
                </Footer>
            </Layout>
        );
    }
}

export default withTranslation()(App);
