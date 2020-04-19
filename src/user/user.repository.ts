import { EntityRepository, Repository } from "typeorm";
import { GameUser } from "./game-user.entity";

@EntityRepository(GameUser)
export class GameUserRepository extends Repository<GameUser> {

}