import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { MySQLFactory } from '../mysql/mysql_factory';

export class TamanhosAction extends Action {
    private generateSQL() : string {
        return 'select tamanho.name from tamanho;';
    }
    @Get('/tamanhos')
    public getTamanhos(){
        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (tamanhos : any) => {       
                this.sendAnswer(tamanhos);
            },
            (error : any) => {
                console.log(error);
                this.sendError(error);
            }
        );
    }

    defineVisibility() {
        this.actionEscope = ActionType.atPublic;
    }
}