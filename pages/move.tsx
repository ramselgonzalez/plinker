import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Chip from "components/Chip";
import Container from "components/Container";
import DataRow from "components/DataRow";
import Typography from "components/Typography";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import RadioButtonGroup from "components/RadioButtonGroup";
import RadioButton from "components/RadioButton";
import Image from "next/image";
import ListItem from "components/ListItem";
import List from "components/List";

function formatNumber(value: number, multiplier: number): string {
  const total = value + value * multiplier;
  return total.toLocaleString();
}

const Move: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gohadoken L / Akuma / Plinker</title>
        <meta property="og:site_name" content="Plinker" />
        <meta property="og:title" content="Gohadoken L" />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta
          property="og:description"
          content="Start Up: 5 / Active: 10 / Recovery: 8 / Block Adv: -3 / Hit Adv. +3"
        />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="theme-color" content="#6fe0eb" />
        {/* <link type="application/json+oembed" href={`${process.env.NEXT_PUBLIC_HOST}/oembed.json`} /> */}
      </Head>
      <Container className="move-container">
        <div className="move-col-1">
          <header className="move-header">
            <Typography className="move-header" gutter shadow uppercase variant="h1">
              Gohadoken L
            </Typography>
            <Typography className="move-subheader" color="blue" shadow variant="h2">
              236L
            </Typography>
          </header>
          <div className="move-image-container">
            <Image
              alt="Akuma performing Gohadoken L"
              layout="fill"
              src="/images/moves/akuma-fireball.png"
              objectFit="cover"
            />
          </div>
          <StatSection className="move-usage-container">
            <StatSectionHeader>Usage &amp; Details</StatSectionHeader>
            <div className="chips">
              {["OTG", "Soft Knockdown"].map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
            <List>
              {[
                "Standard mashable standing jab with a smallish hitbox.",
                "Serviceable as an anti air in certain situations.",
              ].map((n) => (
                <ListItem key={n}>{n}</ListItem>
              ))}
            </List>
          </StatSection>
        </div>
        <div>
          <StatSection divider>
            <StatSectionHeader>Basic Info</StatSectionHeader>
            <DataRow label="Total Hits" value="2" />
            <DataRow label="Block" value="Low" />
            <DataRow label="Hit Type" value="Strike" />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value="5" />
            <DataRow label="Active" value="3" />
            <DataRow label="Recovery" value="6" />
            <DataRow label="Block Adv." value="-1" />
            <DataRow label="Hit Adv." value="2" />
          </StatSection>
          <StatefulStatSection>
            {(multiplier, onChange) => (
              <StatSection divider>
                <StatSectionHeader>Damage & Meter Values</StatSectionHeader>
                <DataRow label="Total Damage" value={formatNumber(5000, multiplier)} />
                <DataRow label="Max Scaled Damage" value={formatNumber(1400, multiplier)} />
                <DataRow label="Damage Per Hit" value={formatNumber(1000, multiplier)} />
                <DataRow label="Meter Gain" value={formatNumber(1000, multiplier)} />
                <DataRow label="Meter Per Hit" value={formatNumber(500, multiplier)} />
                <form className="stat-section-multiplier-container">
                  <legend className="stat-section-multiplier-legend">
                    <Typography component="p" uppercase variant="subheading1">
                      Apply X-Factor Multiplier
                    </Typography>
                    <Typography color="blue" component="p" shadow variant="h4">
                      (+{multiplier.toLocaleString("en", { style: "percent" })})
                    </Typography>
                  </legend>
                  <RadioButtonGroup>
                    <RadioButton label="None" checked={multiplier === 0} onChange={onChange} value={0} />
                    <RadioButton label="Level 1" checked={multiplier === 0.3} onChange={onChange} value={0.3} />
                    <RadioButton label="Level 2" checked={multiplier === 0.5} onChange={onChange} value={0.5} />
                    <RadioButton label="Level 3" checked={multiplier === 0.75} onChange={onChange} value={0.75} />
                  </RadioButtonGroup>
                </form>
              </StatSection>
            )}
          </StatefulStatSection>
        </div>
      </Container>
    </>
  );
};

interface StatefulStatSectionProps {
  children: (multiplier: number, onChange: (event: React.ChangeEvent<HTMLInputElement>) => void) => void;
}

function StatefulStatSection(props: StatefulStatSectionProps) {
  const { children } = props;
  const [multiplier, setMultiplier] = useState(0);
  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value);
    setMultiplier(value);
  }

  return <>{children(multiplier, onChange)}</>;
}

export default Move;
