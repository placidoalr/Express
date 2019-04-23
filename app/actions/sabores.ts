import { Get} from '../decorators';
import {Action} from '../kernel/action';
import {ActionType} from '../kernel/route-types';
import { KernelUtils } from '../kernel/kernel-utils';
import { MySQLFactory } from '../mysql/mysql_factory';

export class SaboresAction extends Action {
    private validateData(){
        new KernelUtils().createExceptionApiError('1002', 'Tamanho da pizza não informado', (this.req.params.tamanho == null || this.req.params.tamanho == undefined));
        new KernelUtils().createExceptionApiError('1003', 'Tamanho da pizza inválido', (this.req.params.tamanho < 1 || this.req.params.tamanho > 3));
    }

    private generateSQL() : string {
        return 'select sabor.sabor, sabor.preco from sabor where sabor.tamanho = \'' + this.req.params.tamanho + '\';';
    }
    @Get('/sabores/:tamanho')
    public Get(){
        this.validateData();
        
        new MySQLFactory().getConnection().select(this.generateSQL()).subscribe(
            (sabores : any) => {       
                this.sendAnswer(sabores);
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