import {Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { MySQLFactory } from '../mysql/mysql_factory';
import { KernelUtils } from '../kernel/kernel-utils';

export class CidadesAction extends Action {
    
    private generateSQL() : string {
        return 'select cidade.name from cidade;';
    }
    @Get('/cidades')
    public getCidades(){
        
        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (cidades : any) => {       
                this.sendAnswer(cidades);
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