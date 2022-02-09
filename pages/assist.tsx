import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Chip from "components/Chip";
import Container from "components/Container";
import DataRow from "components/DataRow";
import ListItem from "components/ListItem";
import RadioButton from "components/RadioButton";
import RadioButtonGroup from "components/RadioButtonGroup";
import StatSection from "components/StatSection";
import StatSectionHeader from "components/StatSectionHeader";
import Typography from "components/Typography";
import List from "components/List";

function formatNumber(value: number, multiplier: number): string {
  const total = value + value * multiplier;
  return total.toLocaleString();
}

type MultiplerState = {
  multiplier: number;
  setMultiplier: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

interface MultiplierProviderProps {
  children: (options: MultiplerState) => React.ReactNode;
}

function MultiplierProvider(props: MultiplierProviderProps) {
  const { children } = props;
  const [multiplier, setMultiplier] = useState(0);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = parseFloat(event.currentTarget.value);
    setMultiplier(value);
  }

  return <>{children({ multiplier, setMultiplier: onChange })}</>;
}

const Assist: NextPage = () => {
  return (
    <>
      <Head>
        <title>Gohadoken L / Akuma / Plinker</title>
        <meta
          property="og:title"
          content="Akuma - Gohadoken L | Plinker: Frama Data for Ultimate Marvel vs. Capcom 3"
        />
        <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/images/moves/akuma-fireball.png`} />
        <meta property="og:description" content="Frame data and details for Akuma's Gohadoken L. assist" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Akuma performaing Gohadoken L" />
      </Head>
      <Container className="move-container">
        <div className="move-col-1">
          <header className="move-header">
            <Typography color="blue" gutter shadow uppercase variant="h3">
              Alpha
            </Typography>
            <Typography shadow uppercase variant="h1">
              Gohadoken L
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
            <DataRow label="Total Hits" value="1" />
            <DataRow label="Block" value="Mid" />
            <DataRow label="Hit Type" value="Projectile" />
            <DataRow label="Team Hyper" value="Messatsu-Gohado Ungyo" />
          </StatSection>
          <StatSection divider>
            <StatSectionHeader>Frame Data</StatSectionHeader>
            <DataRow label="Start Up" value="32" />
            <DataRow label="Active" value="--" />
            <DataRow label="Recovery" value="89" />
            <DataRow label="Alt. Assist Recovery" value="70" />
          </StatSection>
          <MultiplierProvider>
            {({ multiplier, setMultiplier }) => (
              <StatSection divider>
                <StatSectionHeader>Damage &amp; Meter Values</StatSectionHeader>
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
                    <RadioButton label="None" checked={multiplier === 0} onChange={setMultiplier} value={0} />
                    <RadioButton label="Level 1" checked={multiplier === 0.3} onChange={setMultiplier} value={0.3} />
                    <RadioButton label="Level 2" checked={multiplier === 0.5} onChange={setMultiplier} value={0.5} />
                    <RadioButton label="Level 3" checked={multiplier === 0.75} onChange={setMultiplier} value={0.75} />
                  </RadioButtonGroup>
                </form>
              </StatSection>
            )}
          </MultiplierProvider>
        </div>
      </Container>
    </>
  );
};

export default Assist;
