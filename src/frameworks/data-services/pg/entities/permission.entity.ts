import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { UsersEntity } from './users.entity';

@Entity('gameplay_permission')
export class PermissionEntity extends BaseEntity {
  @ManyToOne(() => UsersEntity, { eager: true })
  @JoinColumn({
    name: 'player_one_id',
  })
  playerOne: UsersEntity;

  @ManyToOne(() => UsersEntity, { eager: true })
  @JoinColumn({
    name: 'player_two_id',
  })
  playerTwo: UsersEntity;

  @Column({
    name: 'accepted',
    type: 'boolean',
  })
  accepted: boolean;

  @Column({
    name: 'player_one_move',
    default: 'x',
  })
  playerOneMove: string;

  @Column({
    name: 'player_two_move',
    default: 'o',
  })
  playerTwoMove: string;
}
