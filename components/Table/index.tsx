import Chip from "components/Chip";
import Link from "components/Link";
import Typography from "components/Typography";
import React from "react";
import routes from "routes";
import { IAssistPreview, ICharacterOverview, IMovePreview } from "types";
import { getInputColor } from "helpers";

// Table Components
function Caption(props: React.ComponentPropsWithoutRef<"caption">) {
  const { children, className, ...rest } = props;
  return (
    <caption
      className={`border-b border-t-3 border-t-neutral-300 border-b-neutral-400 py-3 text-left ${className}`}
      {...rest}
    >
      {children}
    </caption>
  );
}

function Tr(props: React.ComponentPropsWithoutRef<"tr">) {
  const { children, ...rest } = props;
  return (
    <tr {...rest} className="border-b border-b-neutral-700 last:border-b-0">
      {children}
    </tr>
  );
}

function Td(props: React.ComponentPropsWithoutRef<"td">) {
  const { children, className, ...rest } = props;
  return (
    <td className={`h3 py-2 text-right uppercase ${className}`} {...rest}>
      {children}
    </td>
  );
}

function Th(props: React.ComponentPropsWithoutRef<"th">) {
  const { children, className, ...rest } = props;
  return (
    <th className={`h4 py-2 text-left uppercase text-neutral-400 ${className}`} {...rest}>
      {children}
    </th>
  );
}

interface IOverviewTableProps {
  character: ICharacterOverview;
}

// Table Implementations
function BasicStats({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          Basic Stats
        </Typography>
      </Caption>
      <tbody>
        <Tr>
          <Th scope="row">Health</Th>
          <Td>{character.health}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Magic Series</Th>
          <Td>{character.chainComboArchetype}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Air Dash</Th>
          <Td>{character.airDashArchetype}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Archetype</Th>
          <Td>{character.archetype}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Recommended Position</Th>
          <Td>{character.recommendedPosition}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

function DamageScaling({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          Min. Damage Scaling
        </Typography>
      </Caption>
      <tbody>
        <Tr>
          <Th scope="row">Normal</Th>
          <Td>{character.minDmgScalingNormal}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Special</Th>
          <Td>{character.minDmgScalingSpecial}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Super</Th>
          <Td>{character.minDmgScalingSuper}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

function XfactorMultipliers({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          X-Factor Multipliers
        </Typography>
      </Caption>
      <thead className="border-b border-neutral-700">
        <Tr>
          <Th></Th>
          <Th className="text-right">Speed</Th>
          <Th className="text-right">Damage</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Th scope="row">Level 1</Th>
          <Td>{character.xf1SpeedBoost}</Td>
          <Td>{character.xf1DamageBoost}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Level 2</Th>
          <Td>{character.xf2SpeedBoost}</Td>
          <Td>{character.xf2DamageBoost}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Level 3</Th>
          <Td>{character.xf3SpeedBoost}</Td>
          <Td>{character.xf3DamageBoost}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

function GroundDashes({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          Ground Dashes
        </Typography>
      </Caption>
      <thead className="border-b border-neutral-700">
        <Tr>
          <Th className="w-fit"></Th>
          <Th className="text-right">Duration</Th>
          <Th className="text-right">Threshold</Th>
        </Tr>
      </thead>
      <tbody>
        <Tr>
          <Th scope="row">Forward</Th>
          <Td>{character.groundDashForwardDuration || "--"}</Td>
          <Td>{character.groundDashForwardCancelThreshold || "--"}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Back</Th>
          <Td>{character.groundDashBackDuration || "--"}</Td>
          <Td>{character.groundDashBackCancelThreshold || "--"}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

function AirDashes({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          Air Dashes
        </Typography>
      </Caption>
      <thead className="border-b border-neutral-700">
        <Tr>
          <Th></Th>
          <Th className="text-right">Duration</Th>
          <Th className="text-right">Threshold</Th>
        </Tr>
      </thead>
      <tbody>
        {character.airDashForwardDuration && (
          <Tr>
            <Th scope="row">Forward</Th>
            <Td>{character.airDashForwardDuration || "--"}</Td>
            <Td>{character.airDashForwardCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashDownForwardDuration && (
          <Tr>
            <Th scope="row">Down Forward</Th>
            <Td>{character.airDashDownForwardDuration || "--"}</Td>
            <Td>{character.airDashDownForwardCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashDownDuration && (
          <Tr>
            <Th scope="row">Down</Th>
            <Td>{character.airDashDownDuration || "--"}</Td>
            <Td>{character.airDashDownCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashDownBackDuration && (
          <Tr>
            <Th scope="row">Down Back</Th>
            <Td>{character.airDashDownBackDuration || "--"}</Td>
            <Td>{character.airDashDownBackCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashBackDuration && (
          <Tr>
            <Th scope="row">Back</Th>
            <Td>{character.airDashBackDuration || "--"}</Td>
            <Td>{character.airDashBackCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashUpBackDuration && (
          <Tr>
            <Th scope="row">Up Back</Th>
            <Td>{character.airDashUpBackDuration || "--"}</Td>
            <Td>{character.airDashUpBackCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashUpDuration && (
          <Tr>
            <Th scope="row">Up</Th>
            <Td>{character.airDashUpDuration || "--"}</Td>
            <Td>{character.airDashUpCancelThreshold || "--"}</Td>
          </Tr>
        )}
        {character.airDashUpForwardDuration && (
          <Tr>
            <Th scope="row">Up Forward</Th>
            <Td>{character.airDashUpForwardDuration || "--"}</Td>
            <Td>{character.airDashUpForwardCancelThreshold || "--"}</Td>
          </Tr>
        )}
      </tbody>
    </table>
  );
}

function JumpDurations({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          Jump Durations
        </Typography>
      </Caption>
      <tbody>
        <Tr>
          <Th scope="row">Normal</Th>
          <Td>{character.normalJumpDuration}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Super</Th>
          <Td>{character.superJumpDuration}</Td>
        </Tr>
        {character.doubleJumpDuration && (
          <Tr>
            <Th scope="row">Double</Th>
            <Td>{character.doubleJumpDuration}</Td>
          </Tr>
        )}
        {character.tripleJumpDuration && (
          <Tr>
            <Th scope="row">Triple</Th>
            <Td>{character.tripleJumpDuration}</Td>
          </Tr>
        )}
      </tbody>
    </table>
  );
}

function CrossoverAttack({ character }: IOverviewTableProps) {
  return (
    <table className="w-full">
      <Caption>
        <Typography variant="h3" className="uppercase">
          Crossover Attack
        </Typography>
      </Caption>
      <tbody>
        <Tr>
          <Th scope="row">Active</Th>
          <Td>{character.crossoverActive}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Recovery</Th>
          <Td>{character.crossoverRecovery}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Block Adv.</Th>
          <Td>{character.crossoverBlockAdv}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

interface IMovePreviewTableProps {
  cid: string;
  move: IMovePreview;
}

function MovePreview({ move, cid }: IMovePreviewTableProps) {
  return (
    <table className="w-full">
      <Caption className="border-t-0 pt-0">
        <Link href={routes.move(cid, move.id)} className="uppercase" variant="h3">
          {move.name}
        </Link>
      </Caption>
      <tbody>
        <Tr>
          <Th scope="row">Input</Th>
          <Td className="h4 normal-case">
            <Chip color={getInputColor(move.input)}>{move.input}</Chip>
          </Td>
        </Tr>
        <Tr>
          <Th scope="row">Start Up</Th>
          <Td>{move.startUp}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Active</Th>
          <Td>{move.active}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Recovery</Th>
          <Td>{move.recovery}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Block Adv.</Th>
          <Td>{move.advBlock}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Hit Adv.</Th>
          <Td>{move.advHit}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

interface IAssistPreviewTableProps {
  cid: string;
  assist: IAssistPreview;
}

function AssistPreview({ assist, cid }: IAssistPreviewTableProps) {
  return (
    <table className="w-full">
      <Caption className="border-t-0 pt-0">
        <Link href={routes.assist(cid, assist.id)} className="uppercase" variant="h3">
          {assist.name}
        </Link>
      </Caption>
      <tbody>
        <Tr>
          <Th scope="row">Start Up</Th>
          <Td>{assist.startUp}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Active</Th>
          <Td>{assist.active}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Recovery</Th>
          <Td>{assist.recovery}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Alt. Assist Recovery</Th>
          <Td>{assist.recoveryAlt}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Damage</Th>
          <Td>{assist.dmg}</Td>
        </Tr>
        <Tr>
          <Th scope="row">Team Hyper Combo</Th>
          <Td>{assist.thc}</Td>
        </Tr>
      </tbody>
    </table>
  );
}

export {
  BasicStats,
  DamageScaling,
  XfactorMultipliers,
  CrossoverAttack,
  GroundDashes,
  AirDashes,
  JumpDurations,
  MovePreview,
  AssistPreview,
};
