import React from "react";
import { NextPage } from "next";
import Container from "components/Container";
import DataItem from "components/DataItem";
import DataRow from "components/DataRow";
import StatSectionHeader from "components/StatSectionHeader";
import StatSection from "components/StatSection";
import StatSectionFooter from "components/StatSectionFooter";
import Typography from "components/Typography";

const Overview: NextPage = () => {
  return (
    <Container className="stats-container">
      <div>
        <section className="overview-header">
          <Typography variant="h1" className="uppercase bottom-gutter text-shadow-white">
            Nova
          </Typography>
          <Typography className="bottom-gutter" variant="body1">
            A strong point character with effective tools to deal with a variety of matchups.
          </Typography>
        </section>
        <StatSection>
          <StatSectionHeader>Basic Stats</StatSectionHeader>
          <DataRow label="Health" value="900,000" />
          <DataRow label="Magic Series" value="Hunter Series" />
          <DataRow label="Air Dash" value="8-Way" />
          <DataRow label="Recommended Position" value="Point" />
        </StatSection>
        <StatSection>
          <StatSectionHeader>Min. Damage Scaling</StatSectionHeader>
          <div className="damage-scaling-grid">
            <DataItem label="Light" value="15%" />
            <DataItem label="Medium" value="15%" />
            <DataItem label="Heavy" value="15%" />
            <DataItem label="Special" value="20%" />
            <DataItem label="Super" value="30%" />
          </div>
        </StatSection>
        <StatSection>
          <StatSectionHeader>X-Factor Multipliers</StatSectionHeader>
          <DataRow label="Level 1" value="+25% / +50%" />
          <DataRow label="Level 2" value="+30% / +60%" />
          <DataRow label="Level 3" value="+40% / +75%" />
          <StatSectionFooter>Speed / Damage</StatSectionFooter>
        </StatSection>
      </div>
      <section className="model-display" />
      <div>
        <StatSection className="ground-dash-section-override">
          <StatSectionHeader>Ground Dashes</StatSectionHeader>
          <DataRow label="Forward" value="38 / 4" />
          <DataRow label="Back" value="25 / 13" />
          <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
        </StatSection>
        <StatSection>
          <StatSectionHeader>Air Dashes</StatSectionHeader>
          <DataRow label="Forward" value="38 / 4" />
          <DataRow label="Down Forward" value="38 / 4" />
          <DataRow label="Down" value="38 / 4" />
          <DataRow label="Down Back" value="38 / 4" />
          <DataRow label="Back" value="38 / 4" />
          <DataRow label="Up Back" value="38 / 4" />
          <DataRow label="Up" value="38 / 4" />
          <DataRow label="Up Forward" value="38 / 4" />
          <StatSectionFooter>Duration / Cancel Threshold</StatSectionFooter>
        </StatSection>
        <StatSection>
          <StatSectionHeader>Jump Durations</StatSectionHeader>
          <div className="damage-scaling-grid">
            <DataItem label="Normal" value="46f" />
            <DataItem label="Super" value="85f" />
            <DataItem label="Double" value="38f" />
          </div>
        </StatSection>
      </div>
    </Container>
  );
};

export default Overview;
